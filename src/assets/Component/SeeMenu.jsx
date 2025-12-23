import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { CartContext } from "../Contexts/CartContext";
import Swal from "sweetalert2";
import CheckoutForm from "./CheckoutForm";

const SeeMenu = () => {
    const { loading, user } = useContext(AuthContext);
    const { cart, addToCart, removeFromCart } = useContext(CartContext);

    const [menus, setMenus] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMenus, setFilteredMenus] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const [orderType, setOrderType] = useState("");
    const [name, setName] = useState(user?.displayName || "");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [tableNo, setTableNo] = useState("");

    const set = { setAddress, setOrderType, setName, setPhone, setTableNo }
    console.log(set)

    useEffect(() => {
        const total = cart.reduce((sum, item) => {
            const price = typeof item.price === 'string'
                ? parseInt(item.price.replace(/\D/g, ''), 10)
                : item.price;
            return sum + price;
        }, 0);
        setTotalPrice(total);
    }, [cart]);

    // 🔄 Load Menus
    useEffect(() => {
        fetch("https://smart-dine-server.vercel.app/menus")
            .then((res) => res.json())
            .then((data) => {
                setMenus(data);
                setFilteredMenus(data);
            });
    }, []);

    // 🔍 Search
    useEffect(() => {
        const filtered = menus.filter((menu) =>
            menu.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMenus(filtered);
    }, [searchTerm, menus]);

    if (loading) {
        return <span className="loading loading-infinity loading-xl"></span>;
    }

    // 📦 Order Data
    const orderData = {
        name,
        phone,
        orderType,
        address,
        tableNo,
        cart: cart.map(item => ({
            _id: item._id,
            name: item.name,
            price: Number(item.price),
            image: item.image
        })),
        email: user?.email,
        date: new Date().toISOString(),
        status: "pending",
    };

    return (
        <div className="bg-amber-50 min-h-screen">
            <div className="md:max-w-6xl mx-auto p-4 bg-base-200">
                {/* HEADER */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">All Menus</h2>
                    <button
                        onClick={() => setShowCart(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        My Cart ({cart.length})
                    </button>
                </div>

                {/* SEARCH */}
                <div className="mb-6 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input input-bordered w-full max-w-md"
                    />
                </div>

                {/* MENU LIST */}
                {menus.length === 0 ? (
                    <span className="loading loading-infinity loading-xl"></span>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredMenus.map((menu) => (
                            <div
                                key={menu._id}
                                className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col"
                            >
                                <img
                                    src={menu.image}
                                    alt={menu.name}
                                    className="w-full h-48 object-cover"
                                />

                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="font-bold text-xl mb-1">{menu.name}</h3>

                                    {menu.category && (
                                        <p className="text-sm font-semibold text-gray-600">
                                            Category: {menu.category}
                                        </p>
                                    )}

                                    {menu.price && (
                                        <p className="text-red-500 font-bold mt-1">
                                            Price: {menu.price} BDT
                                        </p>
                                    )}
                                    {menu.quantity && (
                                        <p className="text-gray-600 font-bold mt-1">
                                            Quantity: {menu.quantity}+
                                        </p>
                                    )}
                                    <p className="text-yellow-500 font-semibold mt-1">
                                        ⭐ {menu.avgRating ? menu.avgRating : "4.8"}
                                    </p>

                                    {menu.description && (
                                        <p className="text-gray-500 text-sm mt-2 flex-1">
                                            {menu.description}
                                        </p>
                                    )}

                                    <button
                                        onClick={() => {
                                            addToCart(menu);
                                            Swal.fire({
                                                icon: "success",
                                                title: "Added to Cart",
                                                timer: 1000,
                                                showConfirmButton: false,
                                            });
                                        }}
                                        className="bg-green-600 text-white w-full py-2 rounded mt-4"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 🛒 CART MODAL */}
            {showCart && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white w-11/12 md:w-1/2 p-5 rounded-lg">
                        <h2 className="text-xl font-bold mb-4">
                            My Cart ({cart.length})
                        </h2>

                        {cart.length === 0 && (
                            <p className="text-center text-gray-500">
                                No items in cart
                            </p>
                        )}

                        {cart.map((item) => (
                            <div
                                key={item._id}
                                className="flex items-center gap-4 border p-3 mb-3 rounded"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-red-500">{item.price} BDT</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="text-red-600 font-bold text-lg"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                        <div className="border-1 rounded p-2">
                            <h1 className=" font-bold text-red-500">Total Price: <span className="text-xl">{totalPrice}</span> BDT</h1>
                            <p className="font-semibold text-sm text-gray-700 mt-2">
                                After the food is delivered, the delivery man will tell the
                                delivery charge according to the address, and that amount has
                                to be paid to the delivery man.
                            </p>
                        </div>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => setShowCart(false)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Close
                            </button>

                            {cart.length > 0 && (
                                <button
                                    onClick={() => setShowOrderForm(true)}
                                    className="bg-green-600 text-white px-4 py-2 rounded"
                                >
                                    Order Now
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* 🧾 ORDER FORM MODAL */}
            {showOrderForm && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <CheckoutForm
                        orderData={orderData}
                        closeModal={() => {
                            setShowOrderForm(false);
                            setShowCart(false);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default SeeMenu;
