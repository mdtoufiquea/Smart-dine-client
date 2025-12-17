import React, { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const AddMenu = () => {
    const navigate = useNavigate()
  const [menuData, setMenuData] = useState({
    name: "",
    image: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuData({ ...menuData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!menuData.name || !menuData.image) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Fields!",
        text: "Please fill all required fields.",
      });
    }

    try {
      const res = await fetch("https://smart-dine-server.vercel.app/menus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menuData),
      });

      const data = await res.json();

      if (data.insertedId || data.success) {
        Swal.fire({
          icon: "success",
          title: "Menu Added!",
          text: "Your menu item has been successfully added.",
        });
        setMenuData({
          name: "",
          image: "",
          category: "",
          price: "",
          quantity: "",
          description: "",
        });
        navigate('/see-menu')
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Something went wrong. Try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error!",
        text: error.message,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4 rounded-2xl">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Add New Menu</h2>

         {/* Menu Name  */}
        <div>
          <label className="font-semibold">Menu Name </label>
          <input
            type="text"
            name="name"
            value={menuData.name}
            onChange={handleChange}
            placeholder="Enter menu name"
            className="input input-bordered w-full"
            required
          />
        </div>

         {/* Image URL  */}
        <div>
          <label className="font-semibold">Image URL </label>
          <input
            type="text"
            name="image"
            value={menuData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Category + Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Category</label>
            <input
              type="text"
              name="category"
              value={menuData.category}
              onChange={handleChange}
              placeholder="e.g. Drinks, Snacks"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="font-semibold">Price</label>
            <input
              type="number"
              name="price"
              value={menuData.price}
              onChange={handleChange}
              placeholder="e.g. 120"
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="font-semibold">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={menuData.quantity}
            onChange={handleChange}
            placeholder="e.g. 50"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            name="description"
            value={menuData.description}
            onChange={handleChange}
            placeholder="Write something about the item..."
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full font-semibold"
        >
          Add Menu
        </button>
      </form>
    </div>
  );
};

export default AddMenu;
