import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Information = () => {
    const [stats, setStats] = useState({
        users: 0,
        menus: 0,
        orders: 0,
    });
    const [loading, setLoading] = useState(true);

    // Intersection observer
    const { ref, inView } = useInView({
        triggerOnce: true, 
        threshold: 0.01,   
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [usersRes, menusRes, ordersRes] = await Promise.all([
                    fetch("https://smart-dine-server.vercel.app/users"),
                    fetch("https://smart-dine-server.vercel.app/menus"),
                    fetch("https://smart-dine-server.vercel.app/orders"),
                ]);

                const [users, menus, orders] = await Promise.all([
                    usersRes.json(),
                    menusRes.json(),
                    ordersRes.json(),
                ]);

                setStats({
                    users: users.length,
                    menus: menus.length,
                    orders: orders.length,
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <span className="loading loading-spinner text-4xl"></span>
            </div>
        );
    }

    return (
        <div
            ref={ref} // intersection observer attach
            className="bg-gradient-to-r from-indigo-50 via-pink-50 to-yellow-50 py-10 md:max-w-10/12 mx-auto p-1  mt-5 rounded-2xl"
        >
            <h1 className="text-center text-2xl font-bold mb-5 text-cyan-800">Our Information</h1>
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                
                {/* Users */}
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-2xl shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">Total Users</h3>
                    <p className="text-4xl font-extrabold">
                        {inView && <CountUp end={stats.users} duration={1.5} separator="," />}
                    </p>
                </div>

                {/* Menus */}
                <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-2xl shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">Total Menus</h3>
                    <p className="text-4xl font-extrabold">
                        {inView && <CountUp end={stats.menus} duration={1.5} separator="," />}
                    </p>
                </div>

                {/* Orders */}
                <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white p-6 rounded-2xl shadow-lg flex flex-col items-center hover:scale-105 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">Total Orders</h3>
                    <p className="text-4xl font-extrabold">
                        {inView && <CountUp end={stats.orders} duration={1.5} separator="," />}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Information;
