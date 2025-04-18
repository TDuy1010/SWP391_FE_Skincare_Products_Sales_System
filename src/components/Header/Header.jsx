import { useState, useRef, useEffect } from "react";
import { BsBag } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../../page/Customer/LoginPage/LoginPage";
import ShopDropdown from "./ShopDropdown";
import { FiUser } from "react-icons/fi";
import { logout } from "../../service/logout";
import { getCart } from "../../service/cart/cart";
import { clearExpiredToken } from "../../service/login/index";
import ChangePassword from "../../page/Customer/ChangePassword/ChangePassword";
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showShopMenu, setShowShopMenu] = useState(false);
  const shopMenuRef = useRef(null);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const shopButtonRef = useRef(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);
  const [error, setError] = useState(null);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const navigate = useNavigate();
  const { cartItemCount, updateCartItemCount } = useCart();

  useEffect(() => {
    // Kiểm tra token hết hạn mỗi khi component được render
    clearExpiredToken("user");

    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUser(storedUser); // Lưu vào state
    }
  }, []);

  // Thêm useEffect để lấy số lượng giỏ hàng khi component được mount và khi có thay đổi
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await getCart();
        if (!response.error && response.result) {
          updateCartItemCount(response.result.items);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCartCount();
  }, [updateCartItemCount]);

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      if (!searchValue.trim()) {
        setShowSearch(false);
      }
    }
  };

  useEffect(() => {
    if (showSearch) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showSearch]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shopMenuRef.current && !shopMenuRef.current.contains(event.target)) {
        setShowShopMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleShopClick = (e) => {
    e.stopPropagation();
    setIsShopDropdownOpen(!isShopDropdownOpen);
  };

  const handleLogout = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    try {
      const response = await logout(token);
      console.log("API Response:", response);
      if (response?.code === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setUser(null);
        setShowUserMenu(false);
        window.location.href = "/"; // Redirect to home page
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Logout failed");
    }
  };

  const handleProfileClick = () => {
    setShowUserMenu(false);
  };

  return (
    <>
      {isScrolled && <div className="h-16" />}
      <header
        className={`w-full bg-white ${
          isScrolled ? "fixed top-0 left-0 right-0 shadow-sm z-50" : "relative"
        } transition-shadow duration-200`}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            {/* Left Section: Navigation Links */}
            <nav className="flex-1 hidden md:flex text-sm font-medium text-gray-700">
              {/* Shop Button with Dropdown */}
              <div className="relative" ref={shopMenuRef}>
                <button
                  ref={shopButtonRef}
                  onClick={handleShopClick}
                  className="relative px-4 py-5 hover:text-black h-16 hover:bg-gray-100 transition-colors duration-200 text-gray-700 group whitespace-nowrap"
                >
                  Cửa hàng
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </button>
                <ShopDropdown
                  isOpen={isShopDropdownOpen}
                  onClose={() => setIsShopDropdownOpen(false)}
                  shopButtonRef={shopButtonRef}
                />
              </div>

              <div className="relative group">
                <button
                  onClick={() => navigate('/about-us')}
                  className="relative px-4 py-5 hover:text-black h-16 hover:bg-gray-100 transition-colors duration-200 block whitespace-nowrap"
                >
                  Về chúng tôi
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </button>
              </div>

              <div className="relative group">
                <button
                  onClick={() => navigate('/blog')}
                  className="relative px-4 py-5 hover:text-black h-16 hover:bg-gray-100 transition-colors duration-200 block whitespace-nowrap"
                >
                  Bảng tin
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </button>
              </div>

              <div className="relative group">
                <button
                  onClick={() => navigate('/helps')}
                  className="relative px-4 py-5 hover:text-black h-16 hover:bg-gray-100 transition-colors duration-200 block whitespace-nowrap"
                >
                  Hỗ trợ
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </button>
              </div>
            </nav>

            {/* Center Section: Logo */}
            <Link
              to="/"
              className="flex-1 text-center text-3xl font-bold cursor-pointer"
            >
              SKYN
            </Link>

            {/* Right Section: Icons */}
            <div className="flex-1 flex items-center justify-end">
              {/* Login/User Button */}
              <div className="relative group" ref={menuRef}>
                {user ? (
                  <div className="relative">
                    <button
                      className="relative h-16 px-4 flex items-center hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => setShowUserMenu(!showUserMenu)}
                    >
                      <FiUser
                        size={20}
                        className="text-gray-700 hover:text-black"
                      />
                    </button>

                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={handleProfileClick}
                        >
                          Thông tin cá nhân
                        </Link>
                        <button
                          onClick={() => setShowChangePasswordModal(true)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Đổi mật khẩu
                        </button>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Đăng xuất
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="relative h-16 px-4 flex items-center hover:bg-gray-100 transition-colors duration-200 text-sm font-medium text-gray-700 hover:text-black"
                  >
                    Đăng nhập
                  </button>
                )}
              </div>

              {/* Cart Link */}
              <div className="relative group">
                <Link
                  to="/cart"
                  className="relative h-16 px-4 flex items-center hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="relative">
                    <BsBag
                      size={20}
                      className="cursor-pointer text-gray-700 hover:text-black transition-colors"
                    />
                    {cartItemCount > 0 && (
                      <div className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemCount}
                      </div>
                    )}
                  </div>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center justify-between md:hidden py-2 px-4">
            <button className="text-sm font-medium hover:text-black">
              Menu
            </button>
            <Link to="/shop" className="text-sm font-medium hover:text-black">
              Cửa hàng
            </Link>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      <ChangePassword
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
      />
    </>
  );
};

export default Header;
