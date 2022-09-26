import React from 'react';
import { useGetProjectsQuery } from '../../features/projects/projectsApi';
import Error from '../common/Error';
import Loader from '../common/Loader';
import ProjectItems from './ProjectItems';
import ProjectsHead from './ProjectsHead';

const ProjectsContainer = () => {
    const { data: projects, isLoading, isError } = useGetProjectsQuery() || {};
    const stages = ['Backlog', 'Ready', 'Doing', 'Review', 'Blocked'];
    let content = '';
    if (isLoading) {
        content = <Loader />;
    }
    if (!isLoading && isError) {
        content = <Error message={'Something went wrong'} />;
    }

    if (!isLoading && !isError) {
        content = (
            <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
                <ProjectsHead />
                <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
                    {stages.map((item, index) => (
                        <ProjectItems key={index} projects={projects} name={item} />
                    ))}
                    <div className="flex-shrink-0 w-6"></div>
                </div>
            </div>
        );
    }
    return <>{content}</>;
};

export default ProjectsContainer;
