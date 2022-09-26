import React from 'react';
import Navigation from '../common/Navigation';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
            <Navigation />

            {children}
        </div>
    );
};

export default Layout;
