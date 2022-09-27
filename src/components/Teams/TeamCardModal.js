import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useAddTeamsMutation, useGetAllTeamsQuery } from '../../features/teams/teamsApi';
import { useDebounce } from '../../hooks/useDebounce';
import Error from '../common/Error';

const TeamCardModal = ({ setIsOpen }) => {
    // local state
    const [team, setTeam] = useState('');
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('red');
    const [skipReq, setSkipReq] = useState(true);
    const [disabled, setDisabled] = useState(true);

    // user
    const { user } = useSelector((state) => state.auth) || {};
    const { email } = user || {};

    const { data: teams } = useGetAllTeamsQuery({ team: team.toLowerCase() }, { skip: skipReq });

    const [addTeams, { isSuccess, isLoading }] = useAddTeamsMutation();

    useEffect(() => {
        if (teams?.length === 0 && title?.length > 0) {
            setDisabled(false);
        } else if (teams?.length > 0 || title?.length === 0) {
            setDisabled(true);
        }
    }, [teams, title]);

    //team card handler
    const addTeamCard = (value) => {
        if (value.length > 0) {
            setTeam(value);
            setSkipReq(false);
        }
    };
    //debounceHandler
    const handleSearch = useDebounce(addTeamCard, 500);

    const handleSubmit = (e) => {
        e.preventDefault();
        addTeams({
            team: team.toLowerCase(),
            title,
            color,
            email,
            date: Date.now(),
            members: [user],
        });
    };

    useEffect(() => {
        if (isSuccess) {
            setIsOpen(false);
            toast.success('Team added successfully!', { position: 'top-right' });
        }
    }, [isSuccess, setIsOpen]);

    return (
        <div className="fixed top-0 left-0 w-full flex items-center justify-center bg-slate-800 h-full bg-opacity-60 z-10">
            <div
                onClick={() => setIsOpen(false)}
                className="absolute w-full h-full bg-slate-800 bg-opacity-60"
            ></div>
            <div className="w-11/12 overflow-hidden md:w-2/5 sm:w-3/5  p-8 z-10 flex flex-col pb-2 bg-white bg-opacity-30 backdrop-blur-sm rounded-lg">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center">
                    Add new team!
                </h3>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="flex gap-2 mb-2">
                            <input
                                id="team-name"
                                name="team"
                                type="text"
                                autoComplete="team-name"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                placeholder="Team name"
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            <div className="w-full relative items-center">
                                <select
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    onChange={(e) => setColor(e.target.value)}
                                >
                                    <option value="red" className="bg-red-200" defaultValue>
                                        Red
                                    </option>
                                    <option value="green" className="bg-green-200">
                                        Green
                                    </option>
                                    <option value="yellow" className="bg-yellow-200">
                                        Yellow
                                    </option>
                                    <option
                                        value="violet"
                                        className="bg-violet-200 hover:bg-violet-400"
                                    >
                                        Violet
                                    </option>
                                    <option value="pink" className="bg-pink-200">
                                        Pink
                                    </option>
                                    <option value="orange" className="bg-orange-200">
                                        Orange
                                    </option>
                                    <option value="teal" className="bg-teal-200">
                                        Teal
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="team-title" className="sr-only">
                                Team title
                            </label>
                            <textarea
                                id="team-title"
                                name="title"
                                type="text"
                                autoComplete="team-title"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                placeholder="Team description"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:bg-gray-300 "
                            disabled={disabled || isLoading}
                        >
                            Add team
                        </button>
                    </div>

                    {teams?.length > 0 && (
                        <Error message={'Team already exist! Try another name.'} />
                    )}
                </form>
            </div>
        </div>
    );
};

export default TeamCardModal;
