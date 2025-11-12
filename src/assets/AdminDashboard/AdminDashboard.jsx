import React from 'react';
import Navbar from '../Home/Navbar/Navbar';
import AdminAside from './AdminAside';
import Footer from '../Home/Footer/Footer';
import { Outlet } from 'react-router';

const AdminDashboard = () => {
    return (
        <div >
            <div className="flex flex-col min-h-screen">

                <Navbar />

                <div className="flex flex-1">
                    <div >
                        <AdminAside></AdminAside>
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

export default AdminDashboard;