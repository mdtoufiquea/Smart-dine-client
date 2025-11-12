import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";

const SeeMenu = () => {
    const {loading} = useContext(AuthContext)
    const [menus, setMenus] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMenus, setFilteredMenus] = useState([]);

    // Fetch menus from backend
    useEffect(() => {
        fetch("https://smart-dine-server.vercel.app/menus")
            .then((res) => res.json())
            .then((data) => {
                setMenus(data);
                setFilteredMenus(data);
            })
            .catch((err) => console.error(err));
    }, []);

    // Handle search
    useEffect(() => {
        const filtered = menus.filter((menu) =>
            menu.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMenus(filtered);
    }, [searchTerm, menus]);
    
    if(loading){
        return <span className="loading loading-infinity loading-xl"></span>
    }
    return (
        <div className="bg-amber-50">
            <div className="md:max-w-10/12 mx-auto p-4 min-h-screen bg-base-200">
            <h2 className="text-2xl font-bold mb-4 text-center">All Menus</h2>

            {/* Search input */}
            <div className="mb-4 flex justify-center">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-full max-w-md"
                />
            </div>

            {/* Menu cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredMenus.map((menu) => (
                    <div
                        key={menu._id}
                        className="bg-white shadow-md rounded-xl overflow-hidden"
                    >
                        <img
                            src={menu.image}
                            alt={menu.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold text-xl">{menu.name}</h3>
                            {menu.category && <p className="font-semibold">Category: {menu.category}</p>}
                            {menu.price && <p className="font-semibold text-red-400">Price: {menu.price} BDT</p>}
                            {menu.quantity && <p className="font-semibold">Quantity: {menu.quantity}+</p>}
                            {menu.description && (
                                <p className="text-gray-500 mt-1">{menu.description}</p>
                            )}
                            <button className="bg-green-600 text-white px-2 py-1 rounded-[5px] my-2">Add to Card</button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
        </div>
        
    );
};

export default SeeMenu;
