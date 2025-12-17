import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AllOderMenu = () => {
    const [orders, setOrders] = useState([]);

    const loadOrders = () => {
        fetch("https://smart-dine-server.vercel.app/orders")
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
    }, []);

    //  Confirm Order Handler
    const handleConfirmOrder = (orderId) => {
        Swal.fire({
            title: "Confirm Order",
            input: "text",
            inputLabel: "Message for user",
            inputPlaceholder: "Your order will be delivered soon",
            showCancelButton: true,
            confirmButtonText: "Confirm Order",
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                fetch(
                    `https://smart-dine-server.vercel.app/orders/confirm/${orderId}`,
                    {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify({
                            message: result.value,
                        }),
                    }
                )
                    .then((res) => res.json())
                    .then(() => {
                        Swal.fire("Confirmed!", "Order has been confirmed", "success");
                        loadOrders(); // 🔄 reload data
                    });
            }
        });
    };

    return (
        <div className="p-4 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
                <div
                    key={order._id}
                    className="border rounded-lg p-4 shadow hover:shadow-lg transition"
                >
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
                                    <p className="text-sm text-red-400">
                                        Price: {item.price} BDT
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="mt-2 text-green-600 font-semibold">
                        Payment: {order.paymentStatus || "Pending"}
                    </p>

                    {/*  Confirm Button Logic */}
                    <div className="mt-4">
                        {order.status === "confirmed" ? (
                            <button
                                disabled
                                className="w-full bg-green-600 text-white py-2 rounded cursor-not-allowed"
                            >
                                ✅ Order Confirmed
                            </button>
                        ) : (
                            <button
                                onClick={() => handleConfirmOrder(order._id)}
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                            >
                                Confirm Order
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllOderMenu;
