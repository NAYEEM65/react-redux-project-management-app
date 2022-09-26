import React, { useEffect, useState } from 'react';
import { useAddTeamMemberMutation } from '../../features/teams/teamsApi';
import { useGetUserQuery } from '../../features/users/usersApi';
import toast from 'react-hot-toast';
import isValidEmail from '../../utils/isValidEmail';
import Error from '../common/Error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const TeamCardModal = ({ id, members, setIsOpen }) => {
    // local state
    const [email, setEmail] = useState('');
    const [skipReq, setSkipReq] = useState(true);
    const [disabled, setDisabled] = useState(true);

    const { data: user } = useGetUserQuery(email, { skip: skipReq });
    const [addTeamMember, { isLoading, isSuccess }] =
        useAddTeamMemberMutation();

    const existingMember = members.filter((member) => member.email === email);

    useEffect(() => {
        if (user?.length > 0 && existingMember?.length === 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [user, existingMember]);

    const debounceHandler = (fn, delay) => {
        let timeoutId;
        return (...arg) => {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                fn(...arg);
            }, delay);
        };
    };

    const doSearch = (value) => {
        if (isValidEmail(value)) {
            setEmail(value);
            setSkipReq(false);
        }
    };

    const handleSearch = debounceHandler(doSearch, 500);

    const handleSubmit = (e) => {
        e.preventDefault();

        addTeamMember({ id, data: { members: [...members, ...user] } });
    };

    useEffect(() => {
        if (isSuccess) {
            setIsOpen(false);
            toast.success('Member added successfully!');
        }
    }, [isSuccess, setIsOpen]);

    return (
        <div className="fixed top-0 left-0 w-full flex items-center justify-center bg-slate-900 h-full bg-opacity-60 z-10 cursor-default">
            <div
                onClick={() => setIsOpen(false)}
                className="absolute w-full h-full bg-slate-900 bg-opacity-60"
            ></div>
            <div className="bg-white w-11/12 md:w-2/5 sm:w-3/5 rounded-lg p-8 z-10">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center">
                    Add team member!
                </h3>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="relative">
                            <label htmlFor="email" className="sr-only">
                                Team title
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                placeholder="Email"
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="group absolute top-0 h-full right-0 z-10 flex items-center justify-center gap-3 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:bg-gray-300"
                                disabled={disabled || isLoading}
                            >
                                <span>Add</span>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </div>
                    </div>

                    {existingMember?.length > 0 && (
                        <Error message={'Member already exist in the team!'} />
                    )}

                    {user?.length === 0 && (
                        <Error message={'No user founded!'} />
                    )}
                </form>
            </div>
        </div>
    );
};

export default TeamCardModal;
