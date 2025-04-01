import { GoHeart, GoHeartFill } from "react-icons/go";
import { FiShoppingBag,  } from "react-icons/fi";
import { addItemToCart } from "../../service/cart/cart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginModal from "../../page/Customer/LoginPage/LoginPage";

// Thêm hàm xử lý HTML content
const stripHtmlTags = (html) => {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

function ProductCardList({
  id,
  slug,
  name,
  description,
  size,
  price,
  thumbnail,
}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await addItemToCart(id);
      if (response.error) {
        toast.error(response.message || "Failed to add item to cart");
      } else {
        toast.success(response.message || "Item added to cart successfully");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${slug}`);
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlist(!isWishlist);
    toast.success(isWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  // Tùy chỉnh định dạng giá tiền VND
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(price).replace('₫', 'VND');
  // Kết quả: "123.456 VND" thay vì "123.456 ₫"

  // Xử lý description để loại bỏ HTML tags
  const cleanDescription = stripHtmlTags(description);

  return (
    <>
      <div 
        onClick={handleCardClick}
        className="group bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0px_15px_35px_rgba(0,0,0,0.1)] h-full flex flex-col relative cursor-pointer">
        {/* Image container */}
        <div 
          className="relative overflow-hidden bg-gray-50 h-64 cursor-pointer"
         
        >
          {/* Main image */}
          <img
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Action buttons container */}
          <div className="absolute inset-x-0 bottom-0 p-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
            
            
            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="bg-black/90 hover:bg-black text-white px-5 py-2 rounded-full shadow-lg transition-all flex items-center gap-2 text-sm font-medium"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Adding</span>
                </>
              ) : (
                <>
                  <FiShoppingBag />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Product info */}
        <div className="px-4 pt-3 pb-4 flex flex-col flex-grow" onClick={handleCardClick}>
          {/* Size info */}
          <p className="text-xs text-gray-500 mb-1">{stripHtmlTags(size)}</p>
          
          {/* Product name */}
          <h3 className="font-medium text-gray-900 line-clamp-2 mb-1 cursor-pointer hover:text-pink-500 transition-colors">
            {stripHtmlTags(name)}
          </h3>
          
          {/* Description - nếu cần hiển thị */}
          {description && (
            <div className="text-sm text-gray-600 line-clamp-2">{cleanDescription}</div>
          )}
          
          {/* Price */}
          <p className="font-semibold text-gray-900 mt-1">{formattedPrice}</p>
          
          {/* Optional rating stars */}
          <div className="flex items-center mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg 
                key={star} 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-3.5 w-3.5 ${star <= 4 ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor" 
                viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
            <span className="text-xs text-gray-500 ml-1">(12)</span>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}

export default ProductCardList;