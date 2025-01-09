import { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { BsBag } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef(null);
  const handleSearch = () => {
    if (searchValue.trim()) {
      console.log(`Searching for: ${searchValue}`);
      // Ví dụ: window.location.href = `/search?query=${searchValue}`;
    }
  };

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

  return (
    <header className="border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-8">
        {/* Left Section: Navigation Links */}
        <div className="flex space-x-6 text-sm font-medium text-gray-700">
          <a href="#" className="hover:text-black">
            Shop
          </a>
          <a href="#" className="hover:text-black">
            About Us
          </a>
          <a href="#" className="hover:text-black">
            Journal
          </a>
          <a href="#" className="hover:text-black">
            Stores
          </a>
        </div>

        {/* Center Section: Logo */}
        <div 
        className="text-xl font-bold cursor-pointer"
        onClick={()=>{navigate("/")}}
        >SKYN</div>

        {/* Right Section: Icons */}
        <div className="flex items-center space-x-6">
          {/* Search Icon and Input */}
          <div
            className="relative flex items-center w-[160px] justify-end"
            ref={searchRef}
            onClick={(e) => e.stopPropagation()}
          >
            {showSearch ? (
              <div className="flex items-center w-full border-b border-gray-400">
                <input
                  type="text"
                  className="w-full text-sm border-none focus:ring-0 outline-none placeholder-gray-400"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button className="ml-2 text-gray-500" onClick={handleSearch}>
                  <FaArrowRightLong size={18} />
                </button>
              </div>
            ) : (
              <FiSearch
                className="text-lg cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSearch(true);
                }}
              />
            )}
          </div>

          {/* Favorite Icon */}
          <FaHeart className="text-lg cursor-pointer" />
          {/* User Icon */}

          <div className="relative" ref={dropdownRef}>
            <FaUserAlt
              className="text-lg cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border border-gray-200 rounded-md z-50">
              <button
                className="w-full px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-md shadow-md transition-all duration-200 ease-in-out"
                onClick={() => {
                  setShowDropdown(false); // Ẩn dropdown
                  navigate("/login"); // Chuyển đến trang đăng nhập
                }}
              >
                Đăng nhập
              </button>
            </div>
            )}
          </div>
          {/* Cart Icon */}
          <div className="relative">
            <BsBag className="text-lg cursor-pointer" />
            {/* Cart Count */}
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              2
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
