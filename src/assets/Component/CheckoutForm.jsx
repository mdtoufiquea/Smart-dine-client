import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const CheckoutForm = ({ orderData, closeModal }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: orderData.name || "",
        phone: orderData.phone || "",
        orderType: orderData.orderType || "",
        address: orderData.address || "",
        tableNo: orderData.tableNo || "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        // Validation
        if (!formData.name || !formData.phone || !formData.orderType) {
            Swal.fire("Error", "Please fill all required fields", "error");
            return;
        }
        if (formData.orderType === "home" && !formData.address) {
            Swal.fire("Error", "Please enter your address", "error");
            return;
        }
        if (formData.orderType === "restaurant" && !formData.tableNo) {
            Swal.fire("Error", "Please enter table number", "error");
            return;
        }

        setLoading(true);

        try {
            // 1️ Calculate totalPrice safely
            const totalPrice = orderData.cart.reduce((acc, item) => acc + Number(item.price || 0), 0);

            // 2️ Create Payment Intent
            const res = await fetch("https://smart-dine-server.vercel.app/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ totalPrice }),
            });
            const data = await res.json();

            // 3️ Confirm Card Payment
            const card = elements.getElement(CardElement);
            const paymentResult = await stripe.confirmCardPayment(data.clientSecret, { payment_method: { card } });

            if (paymentResult.error) {
                Swal.fire("Payment Failed", paymentResult.error.message, "error");
            } else if (paymentResult.paymentIntent.status === "succeeded") {
                // 4️ Sanitize cart items for DB
                const sanitizedCart = orderData.cart.map(item => ({
                    _id: item._id,
                    name: item.name,
                    price: Number(item.price),
                    image: item.image
                }));

                // 5️ Save full order to DB
                const fullOrder = {
                    ...orderData,
                    ...formData,
                    createdAt: new Date(),
                    paymentStatus: "paid",
                    cart: sanitizedCart
                };

                await fetch("https://smart-dine-server.vercel.app/orders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(fullOrder),
                });

                Swal.fire("Success", "Order Placed Successfully!", "success");
                closeModal();
                navigate('/user-dashboard/my-orders')
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Something went wrong", "error");
        }

        setLoading(false);
    };


    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-11/12 md:w-1/2 flex flex-col gap-4">
            <h2 className="text-xl font-bold mb-4">Order & Payment</h2>

            {/* Name */}
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
            />

            {/* Phone */}
            <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
            />

            {/* Order Type */}
            <select
                name="orderType"
                value={formData.orderType}
                onChange={handleChange}
                className="select select-bordered w-full"
                required
            >
                <option value="">Select Order Type</option>
                <option value="home">Home Delivery</option>
                <option value="restaurant">In Restaurant</option>
            </select>

            {/* Conditional Fields */}
            {formData.orderType === "home" && (
                <textarea
                    name="address"
                    placeholder="Full Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                    required
                />
            )}

            {formData.orderType === "restaurant" && (
                <input
                    type="text"
                    name="tableNo"
                    placeholder="Table Number"
                    value={formData.tableNo}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />
            )}

            {/* Stripe Card Element */}
            <CardElement className="p-3 border rounded" />

            <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={closeModal} className="btn btn-ghost">Cancel</button>
                <button type="submit" className={`bg-green-600 text-white px-4 py-2 rounded ${loading ? "opacity-50" : ""}`} disabled={!stripe || loading}>
                    {loading ? "Processing..." : "Pay & Order"}
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;
