import React from 'react';

const ProjectCards = ({ children }) => {
    return (
        <div className="flex flex-col pb-2 overflow-auto bg-white bg-opacity-30 backdrop-blur-sm px-2 rounded-lg min-h-[456px]">
            {children}
        </div>
    );
};

export default ProjectCards;
