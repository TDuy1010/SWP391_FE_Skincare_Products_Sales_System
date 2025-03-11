import { useState } from "react";

const AddUser = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullname: "",
    role: "Admin/User",
    phone: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const [showNotification, setShowNotification] = useState(false);

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

    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#182237] text-gray-300 p-4 rounded-lg w-[400px] max-h-[500px] shadow-lg overflow-auto">
        <h2 className="text-xl font-semibold mb-3">Add new user</h2>

        <form onSubmit={handleSubmit}>
          {/* User Name */}
          <div className="mb-3">
            <label className="block text-sm font-bold">User name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-1 border bg-[#182237] rounded text-gray-300 focus:ring focus:ring-blue-500"
              required
            />
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="block text-sm font-bold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-1 border rounded bg-[#182237] text-gray-300 focus:ring focus:ring-blue-500"
              required
            />
          </div>

          {/* Full Name */}
          <div className="mb-3">
            <label className="block text-sm font-bold">Full name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full p-1 border bg-[#182237] rounded text-gray-300 focus:ring focus:ring-blue-500"
              required
            />
            {errors.fullname && (
              <p className="text-red-500 text-xs">{errors.fullname}</p>
            )}
          </div>

          {/* Role & Phone */}
          <div className="flex gap-2 mb-3">
            <div className="w-1/2">
              <label className="block text-sm font-bold">Role</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-1 border rounded bg-[#182237] text-gray-300 focus:ring focus:ring-blue-500"
                required
              >
                <option value="">Choose</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-bold">Phone number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-1 border rounded bg-[#182237] text-gray-300 focus:ring focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="block text-sm font-bold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-1 border rounded bg-[#182237] text-gray-300 focus:ring focus:ring-blue-500"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block text-sm font-bold">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-1 border rounded bg-[#182237] text-gray-300 focus:ring focus:ring-blue-500"
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

      {/* Thông báo thành công */}
      {showNotification && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1E283A] text-gray-300 px-6 py-3 rounded-md shadow-lg">
          <h3 className="font-bold text-lg text-center">Notification</h3>
          <p className="text-sm text-center text-gray-300">
            User added successfully!
          </p>
        </div>
      )}
    </div>
  );
};

export default AddUser;
