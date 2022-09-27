import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import Error from '../components/common/Error';
import toast from 'react-hot-toast';
import { useRegisterMutation } from '../features/auth/authApi';

export default function Register() {
    // local states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState('');

    // api hooks
    const [register, { data, isLoading, error: resError }] = useRegisterMutation();

    // navigate hook
    const navigate = useNavigate();

    useEffect(() => {
        if (resError?.data) {
            setError(resError.data);
        }
        if (data?.accessToken) {
            setError('');
            navigate('/inbox');
        }
    }, [resError, data, navigate]);

    // handler functions
    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError(`Passwords do not matched!`);
        } else {
            register({ name, email, password });
            toast.success('Registration successful');
        }
        if (resError) {
            toast.error('Registration failed! Please try again later.');
        }
    };

    return (
        <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
            <div className="grid place-items-center h-screen">
                <div className="grid place-items-center ">
                    <div className="items-center mt-5 justify-center py-12 px-4 sm:px-6 lg:px-8 flex flex-col pb-2 overflow-auto bg-white bg-opacity-30 backdrop-blur-sm  rounded-lg min-h-[456px]">
                        <div className="max-w-md w-full space-y-8">
                            <div>
                                <img
                                    className="mx-auto h-12 w-auto"
                                    src={logo}
                                    alt="Learn with sumit"
                                />
                                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                    Sign in to your account
                                </h2>
                            </div>
                            <form
                                className="mt-8 space-y-6"
                                onSubmit={handleSubmit}
                                autoComplete="off"
                            >
                                <input type="hidden" name="remember" value="true" />
                                <div className="rounded-md shadow-sm -space-y-px">
                                    <div className="relative z-0 mb-6 w-full group">
                                        <input
                                            type="name"
                                            name="Name"
                                            id="floating_name"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                                            placeholder=" "
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <label
                                            htmlFor="floating_name"
                                            className=" absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:font-bold peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Full Name
                                        </label>
                                    </div>
                                    <div className="relative z-0 mb-6 w-full group">
                                        <input
                                            type="email-address"
                                            name="email"
                                            id="floating_email"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                                            placeholder=" "
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <label
                                            htmlFor="floating_email"
                                            className=" absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:font-bold peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Email address
                                        </label>
                                    </div>

                                    <div className="relative z-0 mb-6 w-full group">
                                        <input
                                            type="password"
                                            name="password"
                                            id="floating_password"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                                            placeholder=" "
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <label
                                            htmlFor="floating_password"
                                            className="peer-focus:font-bold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Password
                                        </label>
                                    </div>
                                    <div className="relative z-0 mb-6 w-full group">
                                        <input
                                            type="password"
                                            name="password"
                                            id="floating_confirmPassword"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-indigo-500 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                                            placeholder=" "
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <label
                                            htmlFor="floating_confirmPassword"
                                            className="peer-focus:font-bold absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Confirm Password
                                        </label>
                                    </div>
                                </div>
                                <div className="flex items-center mb-4">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        value=""
                                        name="agree"
                                        className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                        checked={agreed}
                                        required
                                        onChange={(e) => setAgreed(e.target.checked)}
                                    />
                                    <label
                                        htmlFor="checkbox-1"
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        I agree to theterms and conditions.
                                    </label>
                                </div>

                                <div className="flex items-center justify-start">
                                    <div className="text-sm">
                                        <span>Already have account? </span>
                                        <Link
                                            to="/login"
                                            className="font-medium text-violet-600 hover:text-violet-500"
                                        >
                                            Sign in
                                        </Link>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                                        disabled={isLoading}
                                    >
                                        <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                                        Sign up
                                    </button>
                                </div>

                                {error !== '' && <Error message={error} />}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
