import React from 'react';
import { useEditProjectMutation } from '../../features/projects/projectsApi';
import ProjectCard from './ProjectCard';
import ProjectCards from './ProjectCards';
import ProjectStatus from './ProjectStatus';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';

const ProjectItems = ({ projects, name }) => {
    const { user } = useSelector((state) => state.auth) || {};
    const status = name.toLowerCase();
    const filteredProjects = projects?.filter((project) => project.status === status);

    const [editProject] = useEditProjectMutation() || [];
    // eslint-disable-next-line no-unused-vars
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'dragCard',
        drop: (item) => addCardDrop(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addCardDrop = (id) => {
        const updatedProject = { status: status };
        editProject({ id, data: updatedProject, email: user.email });
    };

    return (
        <div className={`flex flex-col flex-shrink-0 w-72`} ref={drop}>
            <ProjectStatus
                title={name}
                item={filteredProjects?.length || 0}
                addBtn={status === 'backlog' ? true : false}
            />

            <ProjectCards>
                {filteredProjects?.length > 0 &&
                    filteredProjects.map((project) => (
                        <ProjectCard title={name} key={project.id} project={project} />
                    ))}
            </ProjectCards>
        </div>
    );
};

export default ProjectItems;
