import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch all users
    const fetchUsers = async () => {
        try {
            const res = await fetch("https://smart-dine-server.vercel.app/users");
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Toggle user role
    const handleToggleRole = async (user) => {
        const newRole = user.role === "admin" ? "user" : "admin";
        const confirm = await Swal.fire({
            title: `Change role to ${newRole}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
        });

        if (confirm.isConfirmed) {
            try {
                const res = await fetch(`https://smart-dine-server.vercel.app/users/role/${user._id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ role: newRole }),
                });
                const data = await res.json();
                if (data.modifiedCount > 0) {
                    Swal.fire("Success", `Role changed to ${newRole}`, "success");
                    fetchUsers();
                }
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Something went wrong", "error");
            }
        }
    };

    // Delete user
    const handleDelete = async (userId) => {
        const confirm = await Swal.fire({
            title: "Delete this user?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
        });

        if (confirm.isConfirmed) {
            try {
                const res = await fetch(`https://smart-dine-server.vercel.app/users/${userId}`, {
                    method: "DELETE",
                });
                const data = await res.json();
                if (data.deletedCount > 0) {
                    Swal.fire("Deleted!", "User has been deleted.", "success");
                    fetchUsers();
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    // Filter users based on search
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 min-h-screen bg-base-200">
            <h2 className="text-2xl font-bold mb-4 text-center">All Users</h2>

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

            {/* Table for large screens */}
            <div className="hidden md:block overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user._id}>
                                <td>
                                    <img
                                        src={user.photoURL || user.photo || "https://via.placeholder.com/50"}
                                        alt={user.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                </td>
                                <td>{user.name}</td>
                                <td>{user.role || "user"}</td>
                                <td className="space-x-2">
                                    <button
                                        onClick={() => handleToggleRole(user)}
                                        className="btn btn-sm btn-warning"
                                    >
                                        {user.role === "admin" ? "Make User" : "Make Admin"}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="btn btn-sm btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Card view for small screens */}
            <div className="md:hidden flex flex-col gap-4">
                {filteredUsers.map((user) => (
                    <div
                        key={user._id}
                        className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={user.photoURL || user.photo || "https://via.placeholder.com/50"}
                                alt={user.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="font-bold text-lg">{user.name}</h3>
                                <p className="text-sm text-gray-500">{user.role || "user"}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-2">
                            <button
                                onClick={() => handleToggleRole(user)}
                                className="btn btn-sm btn-warning flex-1"
                            >
                                {user.role === "admin" ? "Make User" : "Make Admin"}
                            </button>
                            <button
                                onClick={() => handleDelete(user._id)}
                                className="btn btn-sm btn-error flex-1"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllUsers;
