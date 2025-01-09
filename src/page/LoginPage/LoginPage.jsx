import img1 from "../../assets/hero-photo.png";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Image Carousel Section */}
      <div className="lg:flex w-full lg:w-1/2 items-center justify-center bg-gray-200">
        <div className="w-full h-[50vh] lg:h-screen flex items-center justify-center">
          <img
            src={img1}
            alt="Discover our products"
            className="w-full h-full object-cover lg:object-contain "
          />
        </div>
      </div>

      {/* Login Form Section */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-10 bg-white">
        <div className="w-full max-w-md">
          <h2 className="mb-8 text-3xl font-semibold text-gray-900">
            Log in to your account
          </h2>

          {/* Login Form */}
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
            <button className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition">
              Create account
              <span className="ml-2 text-gray-500">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
