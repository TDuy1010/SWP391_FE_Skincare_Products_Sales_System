import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/img/hero-photo.png";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { login } from "../../service/login/index"; // Import API login

const LoginModal = ({ isOpen, onClose }) => {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setShowCreateAccount(false);
      setShowForgotPassword(false);
      setError("");
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    setShowCreateAccount(false);
    setShowForgotPassword(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(formData.username, formData.password);
      console.log("API Response:", response);

      if (response?.error) {
        setError(response.message);
        return;
      }

      if (response?.code === 200) {
        const token = response.result.token;
        console.log("token", token);
        localStorage.setItem("token", token);
        onClose();
        navigate("/");
        // window.location.reload();
      } else {
        setError(response.message || "Invalid username or password");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed. Please check your credentials.");
    }
  };
  if (!isOpen) return null;

  const renderForm = () => {
    if (showCreateAccount) {
      return <RegisterForm onBackToLogin={() => setShowCreateAccount(false)} />;
    }
    if (showForgotPassword) {
      return (
        <ForgotPasswordForm
          onBackToLogin={() => setShowForgotPassword(false)}
        />
      );
    }
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Log in to your account
        </h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full p-3 border-b border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-gray-900 placeholder-gray-500"
              required
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full p-3 border-b border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-gray-900 placeholder-gray-500"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Forgotten password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-black text-white text-sm font-semibold rounded-md hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-4">New to SKYN?</p>
          <button
            onClick={() => setShowCreateAccount(true)}
            className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
          >
            Create account
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-5xl rounded-lg shadow-xl flex overflow-hidden">
          <div className="hidden lg:block w-1/2 relative">
            <img
              src={img1}
              alt="Beauty Product"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2 p-8">
            <button
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
              onClick={handleClose}
            >
              <span className="text-2xl">&times;</span>
            </button>
            {renderForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
