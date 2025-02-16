import { useState } from "react";

const AddProduct = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
    quantity: 1,
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuantityChange = (amount) => {
    setFormData((prev) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + amount), 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data:", formData);
    // API
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#182237] text-white p-4 rounded-lg w-[400px] max-h-[500px] shadow-lg overflow-auto">
        <h2 className="text-xl font-semibold mb-3">Product Add</h2>

        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Name */}
          <div className="flex items-center gap-2">
            <label className="w-1/3 text-sm">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-[500px] p-1 border bg-[#182237] rounded text-white focus:ring focus:ring-blue-500"
              required
            />
          </div>

          {/* Type */}
          <div className="flex items-center gap-2">
            <label className="w-1/3 text-sm">Type:</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-[500px] p-1 border bg-[#182237] rounded text-white focus:ring focus:ring-blue-500"
              required
            >
              <option value="">Choose</option>
              <option value="Skincare">Skincare</option>
              <option value="Haircare">Haircare</option>
            </select>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <label className="w-1/3 text-sm">Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-[500px] p-1 border bg-[#182237] rounded text-white focus:ring focus:ring-blue-500"
              required
            />
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-2">
            <label className="w-1/3 text-sm">Quantity:</label>
            <div className="flex items-center w-3/4">
              <button
                type="button"
                onClick={() => handleQuantityChange(-1)}
                className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-500"
              >
                -
              </button>
              <span className="w-10 text-center">{formData.quantity}</span>
              <button
                type="button"
                onClick={() => handleQuantityChange(1)}
                className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-500"
              >
                +
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm mb-1">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full p-1 border rounded bg-[#182237] text-white focus:ring focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm mb-1">Url Image:</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full p-1 border rounded bg-[#182237] text-white focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-3 gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-1 bg-gray-600 rounded hover:bg-gray-500"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-6 py-1 bg-purple-600 rounded hover:bg-purple-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
