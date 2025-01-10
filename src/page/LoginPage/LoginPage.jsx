import { useState } from "react";
import img1 from "../../assets/hero-photo.png";

const LoginPage = () => {
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row h-min bg-gray-50">
      {/* Image Carousel Section */}
      <div className="hidden lg:flex w-full lg:w-1/2 h-auto items-center justify-center bg-gray-200">
        <img
          src={img1}
          alt="Discover our products"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Login or Create Account Form Section */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-10 bg-white">
        <div className="w-full max-w-md">
          {!showCreateAccount ? (
            <>
              {/* Login Form */}
              <h2 className="mb-8 text-3xl font-semibold text-gray-900 text-center lg:text-left">
                Log in to your account
              </h2>
              <form action="/login" method="POST">
                {/* Email Input */}
                <div className="relative mb-6">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    className="w-full border-b border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-gray-900 placeholder-gray-500"
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="relative mb-6">
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    className="w-full border-b border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-gray-900 placeholder-gray-500"
                    required
                  />
                </div>

                {/* Forgotten Password */}
                <div className="mb-8 text-right">
                  <a href="#" className="text-sm text-gray-600 hover:underline">
                    Forgotten password?
                  </a>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-black text-white text-sm font-semibold rounded-md hover:bg-gray-800 transition mb-6"
                >
                  Login
                </button>
              </form>

              {/* New Account Section */}
              <div className="text-sm text-gray-600 text-center">
                <p className="mb-4">New to CEIN.?</p>
                <button
                  onClick={() => setShowCreateAccount(true)}
                  className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
                >
                  Create account
                  <span className="ml-2 text-gray-500">→</span>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Create Account Form */}
              <h2 className="mb-8 text-3xl font-semibold text-gray-900 text-center lg:text-left">
                Create your account
              </h2>
              <form action="/register" method="POST">
                <div className="relative mb-6">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className="w-full border-b border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-gray-900 placeholder-gray-500"
                    required
                  />
                </div>

                <div className="relative mb-6">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    className="w-full border-b border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-gray-900 placeholder-gray-500"
                    required
                  />
                </div>

                <div className="relative mb-6">
                  <input
                    type="password"
                    name="password"
                    placeholder="Create Password"
                    className="w-full border-b border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-gray-900 placeholder-gray-500"
                    required
                  />
                </div>

                <div className="relative mb-6">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full border-b border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-gray-900 placeholder-gray-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-black text-white text-sm font-semibold rounded-md hover:bg-gray-800 transition mb-6"
                >
                  Create Account
                </button>
              </form>

              <div className="text-sm text-gray-600 text-center">
                <p className="mb-4">Already have an account?</p>
                <button
                  onClick={() => setShowCreateAccount(false)}
                  className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
                >
                  Back to login
                  <span className="ml-2 text-gray-500">→</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
