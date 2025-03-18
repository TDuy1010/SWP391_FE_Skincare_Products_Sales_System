/* eslint-disable react/prop-types */
import { useState } from "react";
import { Star } from "lucide-react";
import ReviewFilter from "./ReviewFilter";

// ReviewItem component definition
export const ReviewItem = ({ review }) => {
  // Format name từ firstName và lastName
  const fullName = review.userResponse ? 
    `${review.userResponse.firstName || ''} ${review.userResponse.lastName || ''}`.trim() : 
    'Người dùng ẩn danh';
  
  // Lấy ngày từ createdAt hoặc sử dụng ngày hiện tại nếu không có
  const reviewDate = review.createdAt ? 
    new Date(review.createdAt).toLocaleDateString('vi-VN') : 
    new Date().toLocaleDateString('vi-VN');

  return (
    <div className="border-b border-gray-200 pb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {review.userResponse?.avatar && (
            <img 
              src={review.userResponse.avatar} 
              alt={fullName}
              className="w-8 h-8 rounded-full mr-2 object-cover" 
            />
          )}
          <div>
            <p className="text-sm font-medium text-gray-900">{fullName}</p>
            <div className="mt-1">
              <RatingStars rating={review.rating || 5} size={14} />
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500">{reviewDate}</p>
      </div>
      <div className="mt-3">
        <p className="text-sm text-gray-600">{review.description}</p>
      </div>
    </div>
  );
};

// RatingStars component definition
export const RatingStars = ({ rating = 5, size = 16 }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={size}
        className={
          i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
        }
      />
    ))}
  </div>
);

const FeedbackSection = ({ 
  product, 
  reviews
}) => {
  const [filteredReviews, setFilteredReviews] = useState(reviews || []);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter reviews when activeFilter or searchTerm changes
  useState(() => {
    if (!reviews || !reviews.length) {
      setFilteredReviews([]);
      return;
    }
    
    let result = [...reviews];
    
    // Filter by rating
    if (activeFilter !== "all") {
      result = result.filter(review => review.rating === parseInt(activeFilter));
    }
    
    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(review => 
        review.description?.toLowerCase().includes(term) || 
        `${review.userResponse?.firstName || ''} ${review.userResponse?.lastName || ''}`.toLowerCase().includes(term)
      );
    }
    
    setFilteredReviews(result);
  }, [reviews, activeFilter, searchTerm]);
  
  // Handle filter changes
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Đánh giá từ khách hàng</h3>
        <div className="flex items-center space-x-2">
          <RatingStars rating={product.rating || 5} size={16} />
          <span className="text-sm text-gray-500">
            ({reviews.length} đánh giá)
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <ReviewFilter
        onFilterChange={handleFilterChange}
        totalReviews={reviews.length}
      />

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review, idx) => (
            <ReviewItem key={idx} review={review} />
          ))
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500">
              {reviews.length > 0
                ? "Không tìm thấy đánh giá phù hợp với bộ lọc"
                : "Chưa có đánh giá nào cho sản phẩm này"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackSection;