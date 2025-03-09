import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../service/login/index"; // Import API login

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  // ✅ Kiểm tra nếu admin đã đăng nhập, chuyển hướng về Dashboard
  useEffect(() => {
    const adminUser = JSON.parse(localStorage.getItem("adminUser"));
    if (adminUser?.token) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(formData.username, formData.password);

      if (response?.error) {
        setError(response.message || "Đăng nhập thất bại");
        return;
      }

      if (response?.code === 200) {
        const { token, role, fullName } = response.result;

        // Lưu thông tin đăng nhập vào localStorage
        localStorage.setItem(
          "adminUser",
          JSON.stringify({
            username: formData.username,
            role,
            fullName,
            token,
          })
        );

        navigate("/admin");
      } else {
        setError("Tên đăng nhập hoặc mật khẩu không đúng");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 to-pink-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="flex items-end justify-center gap-1">
            <div className="text-4xl font-bold text-black">SKYN</div>
            <div className="text-sm text-gray-500 mb-1 font-semibold">ADMIN</div>
          </div>
          <p className="mt-2 text-gray-500 text-sm">Admin Dashboard Login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                required
                className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          {error && (
            <div className="text-center text-sm font-medium text-rose-500 bg-rose-50 py-2 px-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
             className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
          >
            Sign in
          </button>
          
          <div className="text-center text-xs text-gray-500 mt-6">
            Skincare Admin Panel © 2025
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;