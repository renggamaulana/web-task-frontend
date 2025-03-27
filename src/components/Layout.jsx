import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

function Layout() {
  return (
    <div className="">
        <div className="flex h-screen bg-[url('/dark-bg.jpg')] backdrop-blur-md bg-cover bg-center">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 relative">
            {/* Navbar */}
            {/* <Navbar /> */}

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4">
            <Outlet />
            </main>
        </div>
        </div>
    </div>
  );
}

export default Layout;