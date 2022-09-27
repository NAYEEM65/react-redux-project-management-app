import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useAddProjectMutation, useGetProjectsQuery } from '../../features/projects/projectsApi';
import { useGetTeamQuery } from '../../features/teams/teamsApi';
import { useDebounce } from '../../hooks/useDebounce';
import Error from '../common/Error';

const AddProjectModal = ({ setModalOpen }) => {
    const [team, setTeam] = useState('');
    const [title, setTitle] = useState('');
    const [skipReq, setSkipReq] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const { user } = useSelector((state) => state.auth) || {};
    const { email, avatar } = user || {};
    const { data: teams } = useGetTeamQuery({ email, team: team.toLowerCase() }, { skip: skipReq });
    const { data: projects } = useGetProjectsQuery('');
    const [addProject, { isLoading, isSuccess }] = useAddProjectMutation();

    useEffect(() => {
        if (teams?.length > 0 && title?.length > 0) {
            setDisabled(false);
        } else if (teams?.length === 0 || title?.length === 0) {
            setDisabled(true);
        }
    }, [teams, title, projects]);

    const addNewProject = (value) => {
        if (value.length > 0) {
            setTeam(value);
            setSkipReq(false);
        }
    };
    //debounce addNewProject
    const handleSearch = useDebounce(addNewProject, 500);
    //project submit Handler
    const handleSubmit = (e) => {
        e.preventDefault();

        addProject({
            team: teams[0].team,
            status: 'backlog',
            color: teams[0].color,
            title,
            email,
            avatar,
            date: Date.now(),
        });
    };

    useEffect(() => {
        if (isSuccess) {
            setModalOpen(false);
            toast.success('Project added successfully!', { position: 'top-right' });
        }
    }, [isSuccess, setModalOpen]);

    return (
        <div className="fixed top-0 left-0 w-full flex items-center justify-center bg-slate-900 h-full bg-opacity-60 z-10">
            <div
                onClick={() => setModalOpen(false)}
                className="absolute w-full h-full bg-slate-900 bg-opacity-60"
            ></div>
            <div className="bg-white w-11/12 md:w-2/5 sm:w-3/5 rounded-lg p-8 z-10">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center">
                    Add new project!
                </h3>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="relative">
                            <label htmlFor="team-name" className="sr-only">
                                Team name
                            </label>
                            <input
                                id="team-name"
                                name="name"
                                type="text"
                                autoComplete="team-name"
                                required
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md mb-2 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                placeholder="Team name"
                                onChange={(e) => handleSearch(e.target.value)}
                            />
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
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:bg-gray-300"
                            disabled={disabled || isLoading}
                        >
                            Add project
                        </button>
                    </div>

                    {teams?.length === 0 && (
                        <Error message={'You are not assigned or team not founded!'} />
                    )}
                </form>
            </div>
        </div>
    );
};

export default AddProjectModal;
