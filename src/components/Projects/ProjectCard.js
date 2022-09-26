/* eslint-disable no-unused-vars */
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDeleteProjectMutation } from '../../features/projects/projectsApi';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import gravatarUrl from 'gravatar-url';

const ProjectCard = ({ project, title: status }) => {
    const { searchedText } = useSelector((state) => state.searched);

    const [textFound, setTextFound] = useState(false);
    const { date, color, team, title, id, email } = project || {};

    const projectId = project.id;
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteProjects, { isLoading, isSuccess }] = useDeleteProjectMutation({
        refetchOnMountOrArgChange: true,
    });
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'dragCard',
        item: { id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    // manage colors
    let teamColor = '';
    if (color === 'red') {
        teamColor = 'text-red-600 bg-red-100';
    } else if (color === 'green') {
        teamColor = 'text-green-600 bg-green-100';
    } else if (color === 'yellow') {
        teamColor = 'text-yellow-600 bg-yellow-100';
    } else if (color === 'violet') {
        teamColor = 'text-violet-600 bg-violet-100';
    } else if (color === 'pink') {
        teamColor = 'text-pink-600 bg-pink-100';
    } else if (color === 'orange') {
        teamColor = 'text-orange-600 bg-orange-100';
    } else if (color === 'teal') {
        teamColor = 'text-teal-600 bg-teal-100';
    }
    const handleDelete = (projectId) => {
        deleteProjects(projectId);
    };
    useEffect(() => {
        if (isSuccess) {
            setModalOpen(false);
            toast.success('Project deleted successfully!');
        }
    }, [isSuccess, setModalOpen]);
    useEffect(() => {
        const foundMatched = title
            .toLowerCase()
            .replaceAll(/\s/g, '')
            .match(searchedText.toLowerCase().replaceAll(/\s/g, ''));
        if (textFound) {
            setTextFound(false);
        }
        if (searchedText === '') {
            setTextFound(false);
        } else if (foundMatched?.length > 0) {
            setTextFound(true);
        }
    }, [searchedText, title, textFound]);

    return (
        <div
            className={`relative cursor-all-scroll flex flex-col items-start p-4 mt-3 bg-white rounded-lg  bg-opacity-90 group hover:bg-opacity-100 ${
                textFound && 'ring-2 ring-pink-500 ring-inset'
            }`}
            draggable="true"
            ref={drag}
        >
            <div
                onClick={() => setModalOpen(false)}
                className={`hidden w-full h-full bg-slate-900 bg-opacity-60 ${modalOpen}?visible:hidden`}
            ></div>
            {status === 'Backlog' && (
                <div className="absolute top-0 right-0 items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
                    <div className="dropdown dropdown-end">
                        <label
                            tabIndex="0"
                            className="btn btn-ghost rounded-lg px-3 w-full gap-3 btn-circle avatar hover:bg-gray-200"
                        >
                            <svg
                                className="w-4 h-4 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                        </label>
                        <ul
                            tabIndex="0"
                            className="mt-3 p-2 shadow menu bg-white bg-opacity-60 menu-compact dropdown-content rounded-lg w-52"
                        >
                            <li>
                                <span
                                    className="cursor-pointer text-gray-600 bg-white bg-opacity-60 hover:bg-white px-5 font-semibold py-2 rounded-lg transition-all delay-75"
                                    onClick={() => handleDelete(projectId)}
                                    disabled={isLoading}
                                >
                                    delete
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
            <span
                className={`flex items-center h-6 px-3 text-xs font-semibold ${teamColor} rounded-full`}
            >
                {team.toUpperCase()}
            </span>
            <h4 className="mt-3 text-sm font-medium">{title}</h4>
            <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
                <div className="flex items-center">
                    <svg
                        className="w-4 h-4 text-gray-300 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="ml-1 leading-none">{moment(date).format('MMM DD')}</span>
                </div>

                <img
                    className="w-6 h-6 ml-auto rounded-full"
                    src={gravatarUrl(email, { size: 80 })}
                    alt="user"
                />
            </div>
        </div>
    );
};

export default ProjectCard;
