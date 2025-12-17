import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import Swal from "sweetalert2";

const MyOderMenu = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    const loadOrders = () => {
        if (!user?.email) return;

        fetch(`https://smart-dine-server.vercel.app/orders/my?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                const sortedOrders = data.sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                );
                setOrders(sortedOrders);
            })
            .catch((err) => console.log(err));
    };


    useEffect(() => {
        loadOrders();
    }, [user]);

    // ⭐ Rating handler
    const handleRating = (orderId) => {
        Swal.fire({
            title: "Rate your order",
            input: "range",
            inputAttributes: {
                min: 1,
                max: 5,
                step: 1
            },
            inputValue: 5,
            showCancelButton: true,
            confirmButtonText: "Submit Rating",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                const rating = parseInt(result.value);

                fetch(`https://smart-dine-server.vercel.app/menus/rating/${orderId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ rating: rating })
                })
                    .then(async (res) => {
                        const data = await res.json();

                        if (!res.ok) {
                            throw new Error(data.message || "Failed to update rating");
                        }

                        if (data.success) {
                            Swal.fire({
                                icon: "success",
                                title: "Success!",
                                text: "Thank you for your rating!",
                            });
                            loadOrders(); // refresh orders
                        } else {
                            throw new Error(data.message || "Rating update failed");
                        }
                    })
                    .catch((error) => {
                        console.error("Rating error:", error);
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: error.message || "Failed to submit rating. Please try again.",
                        });
                    });
            }
        });
    };


    return (
        <div className="p-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {orders.length === 0 && (
                <p className="text-center text-gray-500">No orders found</p>
            )}

            {orders.map((order) => (
                <div
                    key={order._id}
                    className="border rounded-lg p-4 shadow hover:shadow-lg transition"
                >
                    {/* Order Info */}
                    <h2 className="text-xl font-bold mb-2">
                        Order by: {order.name}
                    </h2>

                    <p className="text-gray-600 mb-1">Phone: {order.phone}</p>
                    <p className="text-gray-600 mb-1">
                        Order Type: {order.orderType}
                    </p>

                    {order.address && (
                        <p className="text-gray-600 mb-1">
                            Address: {order.address}
                        </p>
                    )}

                    {order.tableNo && (
                        <p className="text-gray-600 mb-1">
                            Table No: {order.tableNo}
                        </p>
                    )}

                    <p className="text-gray-500 text-sm mb-2">
                        Date: {new Date(order.date).toLocaleString()}
                    </p>

                    {/* Cart Items */}
                    <div className="space-y-2">
                        {order.cart.map((item) => (
                            <div
                                key={item._id}
                                className="flex items-center gap-3 border rounded p-2"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-red-400 text-sm">
                                        Price: {item.price} BDT
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Payment */}
                    <p className="mt-2 text-green-600 font-semibold">
                        Payment: {order.paymentStatus || "Pending"}
                    </p>

                    {/* ✅ Confirm + Message + Rating */}
                    {order.status === "confirmed" && (
                        <div className="mt-3 p-3 bg-green-50 rounded">
                            <p className="text-green-700 font-bold">
                                ✅ Your order is confirmed
                            </p>

                            {order.adminMessage && (
                                <p className="text-gray-700 text-sm mt-1">
                                    Message: {order.adminMessage}
                                </p>
                            )}

                            {/* ⭐ Rating */}
                            {!order.rating ? (
                                <button
                                    onClick={() => handleRating(order._id)}
                                    className="mt-3 bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                                >
                                    ⭐ Please rate now
                                </button>
                            ) : (
                                <p className="mt-2 text-yellow-600 font-semibold">
                                    Your Rating: ⭐ {order.rating}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MyOderMenu;
