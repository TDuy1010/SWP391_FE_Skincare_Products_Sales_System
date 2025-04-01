import React, { useState } from "react";
import LoginModal from "../LoginPage/LoginPage";
import { FiShoppingBag } from "react-icons/fi";
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
  const navigate = useNavigate();

  // Format giá tiền theo định dạng Việt Nam
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleCardClick = () => {
    navigate(`/product/${slug}`);
  };

  const handleAddToCart = async (e) => {
    // Stop propagation to prevent navigation when clicking the button
    e.stopPropagation();

    setIsLoading(true);
    try {
      const response = await addItemToCart(id, 1);

      if (response.unauthorized) {
        // Handle unauthorized specifically
        setShowLoginModal(true);
        toast.warning("Please log in to add items to your cart");
      } else if (response.error) {
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
        className="group cursor-pointer relative flex flex-col bg-white overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 h-[500px] w-[300px]"
        onClick={handleCardClick}
      >
        {/* Tag */}
        {tag && (
          <span className="absolute top-3 left-3 z-10 text-xs font-medium bg-pink-100 text-pink-800 px-3 py-1 rounded-full shadow-sm">
            {tag}
          </span>
        )}

        {/* Image Container */}
        <div className="h-[280px] w-full overflow-hidden bg-gray-50 relative">
          <img
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />

          {/* Action Buttons */}
          <div className="absolute bottom-0 inset-x-0 p-4 flex justify-between opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetail();
              }}
              className="bg-white text-gray-900 p-2 rounded-full shadow-lg hover:shadow-xl transition-all"
            ></button>

            <button
              onClick={(e) => handleAddToCart(e)}
              disabled={isLoading}
              className="bg-black text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
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
        <div className="p-5 flex flex-col flex-grow">
          {/* Size */}
          <p className="text-xs text-gray-500 mb-1">{size}</p>

          {/* Name */}
          <h3 className="font-medium text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
            {name}
          </h3>

          {/* Price */}
          <p className="font-semibold text-lg text-black mt-auto">
            {formatPrice(price)}
          </p>
        </div>

        {/* Button Section - Single CTA at bottom */}
        <div className="px-5 pb-5 mt-auto">
          <button
            className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Đang thêm vào giỏ hàng...</span>
              </>
            ) : (
              <>
                <FiShoppingBag size={16} />
                <span>Thêm vào giỏ hàng</span>
              </>
            )}
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