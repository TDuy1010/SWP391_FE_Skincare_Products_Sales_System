const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <h2 className="mb-8 text-2xl font-semibold text-gray-800">Log in to your account</h2>

        {/* Email Address Input */}
        <div className="relative mb-6">
          <input
            type="email"
            placeholder="Email Address"
            className="peer w-full bg-transparent border-b border-gray-300 text-gray-600 placeholder-transparent focus:outline-none focus:border-gray-800"
          />
          <label
            className="absolute left-0 top-0 text-gray-400 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-800"
          >
            Email Address
          </label>
          <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400">
            →
          </span>
        </div>

        {/* Password Input */}
        <div className="relative mb-4">
          <input
            type="password"
            placeholder="Password"
            className="peer w-full bg-transparent border-b border-gray-300 text-gray-600 placeholder-transparent focus:outline-none focus:border-gray-800"
          />
          <label
            className="absolute left-0 top-0 text-gray-400 text-sm transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-300 peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-800"
          >
            Password
          </label>
          <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400">
            →
          </span>
        </div>

        {/* Forgotten Password */}
        <div className="mb-8 text-right">
          <a href="#" className="text-sm text-gray-500 hover:underline">
            Forgotten password?
          </a>
        </div>

        {/* Login Button */}
        <button className="w-full px-4 py-2 bg-black text-white text-sm font-semibold rounded hover:bg-gray-800 transition">
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;