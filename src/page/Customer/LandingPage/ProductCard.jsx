import React, { useState } from "react";
import LoginModal from "../LoginPage/LoginPage";
import { FiShoppingBag,  } from "react-icons/fi";
import { addItemToCart } from "../../../service/cart/cart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  id,
  slug,
  tag,
  name,
  description,
  size,
  price,
  thumbnail,
}) => {
 
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Format giá tiền theo định dạng Việt Nam
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleCardClick = () => {
    navigate(`/product/${slug}`);
  };

  const handleAddToCart = async (e) => {
    // Stop propagation to prevent navigation when clicking the button
    e.stopPropagation();

    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await addItemToCart(id, 1);
      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success("Đã thêm vào giỏ hàng!");
      }
    } catch (error) {
      toast.error("Không thể thêm vào giỏ hàng");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleViewDetail = () => {
    navigate(`/product/${slug}`);
  };

  return (
    <>
      <div
        className="group cursor-pointer relative flex flex-col items-center text-center bg-white p-4 hover:shadow-xl transition duration-300 rounded-lg h-[500px] w-[300px]"
        onClick={handleCardClick}
      >
        {/* Tag */}
        {tag && (
          <span className="absolute top-3 left-3 z-10 text-xs font-medium bg-white text-gray-800 px-3 py-1 rounded-full shadow-sm">
            {tag}
          </span>
        )}
        
        {/* Image Container */}
        <div className="aspect-square overflow-hidden bg-gray-50 relative">
          <img
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Gradient Overlay on Hover */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"
          />
          
          {/* Action Buttons */}
          <div className="absolute bottom-0 inset-x-0 p-4 flex justify-between opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetail();
              }}
              className="bg-white text-gray-900 p-2 rounded-full shadow-lg hover:shadow-xl transition-all"
            >

            </button>
            
            <button
              onClick={(e) => handleAddToCart(e)}
              disabled={isLoading}
              className="bg-black text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Đang thêm...</span>
                </>
              ) : (
                <>
                  <FiShoppingBag size={16} />
                  <span>Thêm vào giỏ</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col">
          {/* Size */}
          <p className="text-xs text-gray-500 mb-1">
            {size}
          </p>
          
          {/* Name */}
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-pink-600 transition-colors min-h-[48px]">
            {name}
          </h3>
          
          {/* Price */}
          <div className="h-[40px] w-full flex items-center justify-center">
            <p className="font-semibold text-black">${formatPrice(price)}</p>
          </div>
        </div>

        {/* Button Section */}
        <div className="w-full mt-2">
          <button
            className="w-full bg-black text-white py-2 px-6 rounded-md text-sm opacity-0 group-hover:opacity-100 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add to your Cart"}
          </button>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default ProductCard;
