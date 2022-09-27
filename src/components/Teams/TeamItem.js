import React, { useState } from 'react';
import moment from 'moment';
import TeamMemberModal from './TeamMemberModal';
import gravatarUrl from 'gravatar-url';

const TeamItem = ({ team }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { id, team: teamName, title, color, date, members } = team || {};

    // manage colors patern
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

    return (
        <div
            className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
            draggable={!isOpen}
        >
            <button
                onClick={() => setIsOpen(true)}
                className="absolute top-0 right-0 items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
            >
                <svg
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
            </button>
            <span
                className={`flex items-center h-6 px-3 text-xs font-semibold ${teamColor} rounded-full`}
            >
                {teamName.toUpperCase()}
            </span>
            <h4 className="mt-3 text-sm font-medium">{title}</h4>
            <div className="flex items-center justify-between w-full mt-3 text-xs font-medium text-gray-400">
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

                <div className="avatar-group -space-x-2">
                    {members.map((member) => (
                        <div key={member.id} className="avatar border-none">
                            <div className="w-6">
                                <img
                                    src={gravatarUrl(member.email, { size: 80 })}
                                    alt={member.name}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isOpen && <TeamMemberModal id={id} members={members} setIsOpen={setIsOpen} />}
        </div>
    );
};

export default TeamItem;
