import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const TopMenu = () => {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://smart-dine-server.vercel.app/menus/top")
            .then((res) => res.json())
            .then((data) => {
                setMenus(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <span className="loading loading-spinner text-4xl"></span>
            </div>
        );
    }

    return (
        <div className="bg-amber-50 py-6 md:max-w-10/12 mx-auto p-1 mt-5 rounded-2xl">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
                    🌟 Top Rated Menus
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {menus.map((menu) => (
                        <div
                            key={menu._id}
                            className="bg-gradient-to-r from-pink-100 via-yellow-100 to-green-100 shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition duration-300"
                        >
                            <img
                                src={menu.image}
                                alt={menu.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 flex flex-col gap-2">
                                <h3 className="text-xl font-bold text-purple-700">{menu.name}</h3>
                                {menu.category && (
                                    <p className="text-sm font-semibold text-gray-600">
                                        Category: {menu.category}
                                    </p>
                                )}
                                {menu.price && (
                                    <p className="text-red-500 font-bold mt-1">{menu.price} BDT</p>
                                )}
                                <p className="text-yellow-500 font-semibold mt-1">⭐ {menu.avgRating || 4.8}</p>
                                {menu.description && (
                                    <p className="text-gray-700 text-sm mt-2">{menu.description}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ✅ See All Menus & Orders Button */}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => navigate("/see-menu")}
                        className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 font-semibold"
                    >
                        See All Menus & Orders
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TopMenu;
