import React from 'react';
import Navbar from '../Home/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Home/Footer/Footer';
import UserAside from './UserAside';

const UserDashboard = () => {
    return (
        <div >
            <div className="flex flex-col min-h-screen">

                <Navbar />

                <div className="flex flex-1">
                    <div >
                        <UserAside></UserAside>
                    </div>
                    <main className="flex-1 p-4">
                        <Outlet />
                    </main>
                </div>
                <Footer />
            </div>

        </div >
    );
};

export default UserDashboard;