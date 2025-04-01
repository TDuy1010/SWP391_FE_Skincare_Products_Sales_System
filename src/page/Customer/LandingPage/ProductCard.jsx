import React, { useState } from "react";
import LoginModal from "../LoginPage/LoginPage";
import { FiShoppingBag, FiEye } from "react-icons/fi";
import { addItemToCart } from "../../../service/cart/cart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCart } from '../../../context/CartContext';

// Thêm hàm xử lý HTML content
const stripHtmlTags = (html) => {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

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
  const { refreshCart } = useCart();

  // Format giá tiền theo định dạng Việt Nam
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price).replace('₫', 'VND');
  };

  const handleCardClick = () => {
    navigate(`/product/${slug}`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      const response = await addItemToCart(id, 1);

      if (response.unauthorized) {
        setShowLoginModal(true);
        toast.warning("Please log in to add items to your cart");
      } else if (response.error) {
        toast.error(response.message);
      } else {
        toast.success("Đã thêm vào giỏ hàng!");
        await refreshCart();
      }
    } catch (error) {
      toast.error("Không thể thêm vào giỏ hàng");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetail = (e) => {
    e.stopPropagation();
    navigate(`/product/${slug}`);
  };

  // Xử lý description để loại bỏ HTML tags
  const cleanDescription = stripHtmlTags(description);
  const cleanSize = stripHtmlTags(size);

  return (
    <>
      <div 
        onClick={handleCardClick}
        className="group bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0px_15px_35px_rgba(0,0,0,0.1)] h-full flex flex-col relative cursor-pointer max-w-[300px]">
        
        {/* Image container */}
        <div className="relative overflow-hidden bg-gray-50 h-64">
          {/* Main image */}
          <img
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          />

          {/* Tag */}
          {tag && (
            <span className="absolute top-3 left-3 z-10 text-xs font-medium bg-black text-white px-3 py-1 rounded-sm">
              {tag}
            </span>
          )}

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Action buttons container */}
          <div className="absolute inset-x-0 bottom-0 p-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="bg-black/90 hover:bg-black text-white px-4 py-2 rounded-full shadow-lg transition-all flex items-center gap-2 text-sm font-medium"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Đang thêm…</span>
                </>
              ) : (
                <>
                  <FiShoppingBag />
                  <span>Thêm vào giỏ hàng </span>
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Product info */}
        <div className="px-4 pt-3 pb-4 flex flex-col flex-grow">
          {/* Size info */}
          <p className="text-xs text-gray-500 mb-1">{cleanSize}</p>
          
          {/* Product name */}
          <h3 className="font-medium text-gray-900 line-clamp-2 mb-1 cursor-pointer hover:text-black transition-colors">
            {stripHtmlTags(name)}
          </h3>
          
          {/* Description - nếu cần hiển thị */}
          {description && (
            <div className="text-sm text-gray-600 line-clamp-2 mb-2">{cleanDescription}</div>
          )}
          
          {/* Price */}
          <p className="font-semibold text-gray-900 mt-1">{formatPrice(price)}</p>
          
          {/* Rating stars */}
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