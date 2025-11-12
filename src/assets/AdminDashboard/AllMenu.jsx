import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AllMenu = () => {
  const [menus, setMenus] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingMenu, setEditingMenu] = useState(null); // কোন menu edit হচ্ছে
  const [menuData, setMenuData] = useState({
    name: "",
    image: "",
    category: "",
    price: "",
    description: "",
    quantity: "",
  });

  // Fetch all menus
  const fetchMenus = async () => {
    try {
      const res = await fetch("https://smart-dine-server.vercel.app/menus");
      const data = await res.json();
      setMenus(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  // Delete menu
  const handleDelete = async (menuId) => {
    const confirm = await Swal.fire({
      title: "Delete this menu item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`https://smart-dine-server.vercel.app/menus/${menuId}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.deletedCount > 0) {
          Swal.fire("Deleted!", "Menu item has been deleted.", "success");
          fetchMenus();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Edit button click
  const handleEdit = (menu) => {
    setEditingMenu(menu._id);
    setMenuData({
      name: menu.name,
      image: menu.image,
      category: menu.category,
      price: menu.price,
      description: menu.description,
      quantity: menu.quantity || "",
    });
  };

  // Form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuData((prev) => ({ ...prev, [name]: value }));
  };

  // Update menu
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://smart-dine-server.vercel.app/menus/${editingMenu}`, {
        method: "PUT", // Full update
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menuData),
      });
      const data = await res.json();
      if (data.modifiedCount > 0) {
        Swal.fire("Updated!", "Menu updated successfully", "success");
        setEditingMenu(null);
        fetchMenus();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  // Filter menus based on search
  const filteredMenus = menus.filter((menu) =>
    menu.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 min-h-screen bg-base-200">
      <h2 className="text-2xl font-bold mb-4 text-center">All Menus</h2>

      {/* Search input */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by menu name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
      </div>

      {/* Edit Form */}
      {editingMenu && (
        <div className="mb-4 flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg space-y-4"
          >
            <h2 className="text-2xl font-bold text-center mb-4">Edit Menu</h2>

            <input
              type="text"
              name="name"
              value={menuData.name}
              onChange={handleChange}
              placeholder="Menu Name"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="image"
              value={menuData.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="category"
              value={menuData.category}
              onChange={handleChange}
              placeholder="Category"
              className="input input-bordered w-full"
              required
            />
            <input
              type="number"
              name="price"
              value={menuData.price}
              onChange={handleChange}
              placeholder="Price"
              className="input input-bordered w-full"
              required
            />
            <input
              type="number"
              name="quantity"
              value={menuData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              className="input input-bordered w-full"
            />
            <textarea
              name="description"
              value={menuData.description}
              onChange={handleChange}
              placeholder="Description"
              className="textarea textarea-bordered w-full"
              required
            ></textarea>

            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary flex-1">
                Update Menu
              </button>
              <button
                type="button"
                className="btn btn-secondary flex-1"
                onClick={() => setEditingMenu(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table for large screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMenus.map((menu) => (
              <tr key={menu._id}>
                <td>
                  <img
                    src={menu.image || "https://via.placeholder.com/50"}
                    alt={menu.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                </td>
                <td>{menu.name}</td>
                <td>{menu.category}</td>
                <td>{menu.price}</td>
                <td>{menu.description}</td>
                <td className="space-x-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleEdit(menu)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(menu._id)}
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
        {filteredMenus.map((menu) => (
          <div
            key={menu._id}
            className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2"
          >
            <img
              src={menu.image || "https://via.placeholder.com/100"}
              alt={menu.name}
              className="w-full h-40 rounded object-cover mb-2"
            />
            <h3 className="font-bold text-lg">{menu.name}</h3>
            <p className="text-sm text-gray-500">
              Category: {menu.category} | Price: {menu.price}
            </p>
            <p className="text-sm">{menu.description}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(menu)}
                className="btn btn-sm btn-primary flex-1"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(menu._id)}
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

export default AllMenu;
