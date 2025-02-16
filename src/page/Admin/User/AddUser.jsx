import { Select } from "antd";
import { useState } from "react";

const AddUser = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "Admin/User",
    phone: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
  
    if (formData.username === "admin") {
      newErrors.username = "User name is already exist";
    }

    if (formData.email === "adminadmin@gmail.com") {
      newErrors.email = "Email is already in use";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("User Data:", formData);
    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#182237] text-white p-4 rounded-lg w-[400px] max-h-[500px] shadow-lg overflow-auto">
        <h2 className="text-xl font-semibold mb-3">Add new user</h2>

        <form onSubmit={handleSubmit}>
          {/* User Name */}
          <div className="mb-3">
            <label className="block text-sm">User name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-[180px] p-1 border bg-[#182237] rounded text-white focus:ring focus:ring-blue-500"
              required
            />
            {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="block text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-1 border rounded bg-[#182237] text-white focus:ring focus:ring-blue-500"
              required
            />
          </div>

          {/* Role & Phone */}
          <div className="flex gap-2 mb-3">
            <div className="w-1/2">
              <label className="block text-sm">Role</label>
              <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-1 border rounded bg-[#182237] text-white focus:ring focus:ring-blue-500"
              required
            >
              <option value="">Choose</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
            </div>
            <div className="w-1/2">
              <label className="block text-sm">Phone number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-1 border rounded bg-[#182237] text-white focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="block text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-1 border rounded bg-[#182237] text-white focus:ring focus:ring-blue-500"
              required
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-sm">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
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
              className="px-4 py-1 bg-purple-600 rounded hover:bg-purple-500"
            >
              Add user
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
