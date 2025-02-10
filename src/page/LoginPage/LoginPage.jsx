import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from '../../assets/img/hero-photo.png';

const LoginModal = ({ isOpen, onClose }) => {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Tài khoản demo
  const DEMO_ACCOUNT = {
    email: 'duy',
    password: '123456',
    fullName: 'Demo User',
  };

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowCreateAccount(false);
      setShowForgotPassword(false);
    }
  }, [isOpen]);

  // Handle close with reset
  const handleClose = () => {
    onClose();
    setShowCreateAccount(false);
    setShowForgotPassword(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (formData.email === DEMO_ACCOUNT.email && 
        formData.password === DEMO_ACCOUNT.password) {
      localStorage.setItem('user', JSON.stringify(DEMO_ACCOUNT));
      onClose();
      window.location.reload(); // Reload để cập nhật header
    } else {
      alert('Invalid email or password');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-5xl rounded-lg shadow-xl flex overflow-hidden">
          {/* Left Side - Image */}
          <div className="hidden lg:block w-1/2 relative">
            <img
              src={img1}
              alt="Beauty Product"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Right Side - Forms */}
          <div className="w-full lg:w-1/2 p-8">
            {/* Close button */}
            <button 
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
              onClick={handleClose}
            >
              <span className="text-2xl">&times;</span>
            </button>

            {!showCreateAccount && !showForgotPassword ? (
              // Login Form
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">Log in to your account</h2>
                
                <form className="space-y-6">
                  <div>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      className="w-full p-3 border-b border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-gray-900 placeholder-gray-500"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      className="w-full p-3 border-b border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-gray-900 placeholder-gray-500"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                    onClick={handleLogin}
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
            ) : showCreateAccount ? (
              // Create Account Form
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">Create your account</h2>
                
                <form className="space-y-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full p-3 border-b border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-gray-900 placeholder-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full p-3 border-b border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-gray-900 placeholder-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Create Password"
                      className="w-full p-3 border-b border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-gray-900 placeholder-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="confirm password"
                      placeholder="Confirm Password"
                      className="w-full p-3 border-b border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-gray-900 placeholder-gray-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-black text-white text-sm font-semibold rounded-md hover:bg-gray-800 transition"
                  >
                    Create Account
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 mb-4">Already have an account?</p>
                  <button
                    onClick={() => setShowCreateAccount(false)}
                    className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                  >
                    Back to login
                    <span className="ml-2">→</span>
                  </button>
                </div>
              </div>
            ) : (
              // Forgot Password Form
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">Reset your password</h2>
                <p className="text-sm text-gray-600">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                
                <form className="space-y-6">
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full p-3 border-b border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-gray-900 placeholder-gray-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-black text-white text-sm font-semibold rounded-md hover:bg-gray-800 transition"
                  >
                    Send Reset Link
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 mb-4">Remember your password?</p>
                  <button
                    onClick={() => setShowForgotPassword(false)}
                    className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                  >
                    Back to login
                    <span className="ml-2">→</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
