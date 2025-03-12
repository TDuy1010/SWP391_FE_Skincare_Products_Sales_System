/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const ProductCard = ({ id, thumbnail, name, description, price, slug }) => {
  // Xử lý khi nhấn nút Add to Cart
  const handleAddToCart = (e) => {
    e.preventDefault(); // Ngăn chặn navigation khi click vào button
    e.stopPropagation(); // Ngăn sự kiện lan tỏa
    // Thêm logic thêm vào giỏ hàng ở đây
    alert('Added to cart!');
  };

  return (
    <Link to={`/product/${slug}`} className="block">
      <div className="group cursor-pointer relative flex flex-col items-center text-center bg-white p-4 hover:shadow-xl transition duration-300 rounded-lg min-h-[480px]">
        {/* Image Section */}
        <div className="h-48 mt-4 flex items-center justify-center">
          <img
            src={thumbnail || 'https://via.placeholder.com/150'}
            alt={name}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/150';
            }}
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col items-center mt-4 space-y-2 flex-1 w-full">
          {/* Name */}
          <div className="h-10 flex items-center justify-center">
            <h3 className="font-semibold text-lg line-clamp-2">{name}</h3>
          </div>

          {/* Description */}
          <div className="h-12 flex items-center justify-center">
            <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
          </div>

          {/* Price */}
          <div className="h-10 flex items-center justify-center">
            <p className="font-semibold text-black">
              {new Intl.NumberFormat('en-US', { 
                style: 'currency', 
                currency: 'USD'
              }).format(price)}
            </p>
          </div>
        </div>

        {/* Button Section */}
        <div className="w-full mt-2">
          <button
            className="w-full bg-black text-white py-2 px-6 rounded-md text-sm opacity-0 group-hover:opacity-100 transition duration-300"
            onClick={handleAddToCart}
          >
            Add to your Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;