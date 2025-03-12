/* eslint-disable react/prop-types */
import { useState } from "react";
import { Star, Loader2 } from "lucide-react";
import ReviewFilter from "./ReviewFilter";
import { addProductFeedback } from "../../../service/feedback";
import { toast } from "react-toastify";
import { getProductDetail } from "../../../service/product";

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
  reviews, 
  setReviews, 
  slug,
  handleLoginRequired
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    description: "",
    rating: 5,
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [filteredReviews, setFilteredReviews] = useState(reviews || []);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Check if user has reviewed
  useState(() => {
    const checkUserReview = () => {
      if (!product?.feedBacks) return;
      
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;
      
      const userReview = product.feedBacks.find(
        feedback => feedback.userResponse && feedback.userResponse.id === user.id
      );

      if (userReview) {
        setHasReviewed(true);
        setReviewForm({
          description: userReview.description || "",
          rating: userReview.rating || 5
        });
      }
    };
    
    checkUserReview();
  }, [product]);
  
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
  
  // Handle review form changes
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };
  
  // Handle filter changes
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };
  
  // Handle review submission
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!product?.id) {
      toast.error("Không thể xác định sản phẩm để gửi đánh giá");
      return;
    }
    
    // Kiểm tra lại token trong localStorage trực tiếp
    const token = localStorage.getItem("token");
    if (!token) {
      handleLoginRequired();
      return;
    }
    
    setSubmitLoading(true);
    
    try {
      // Chuẩn bị dữ liệu đánh giá - chỉ gồm description và rating
      const feedbackData = {
        description: reviewForm.description,
        rating: parseInt(reviewForm.rating)
      };
      
      // Gọi API để gửi đánh giá
      const response = await addProductFeedback(product.id, feedbackData);
      
      if (response.error) {
        if (response.requireAuth || response.code === 1201) {
          // Mở modal đăng nhập thay vì chuyển hướng
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          handleLoginRequired();
        } else {
          toast.error(response.message || "Không thể gửi đánh giá");
        }
      } else {
        // Xử lý thành công
        const newReview = response.result;
        
        // Thêm đánh giá mới vào đầu danh sách
        setReviews(prevReviews => [newReview, ...prevReviews]);
        
        // Reset form và hiển thị thông báo thành công
        setReviewForm({ description: "", rating: 5 });
        setShowReviewForm(false);
        setHasReviewed(true);
        toast.success("Cảm ơn bạn đã đánh giá sản phẩm!");
        
        // Refresh lại danh sách đánh giá từ sản phẩm
        try {
          const updatedProduct = await getProductDetail(slug);
          if (!updatedProduct.error) {
            if (updatedProduct.result.feedBacks) {
              setReviews(updatedProduct.result.feedBacks);
            }
          }
        } catch (refreshError) {
          console.error("Error refreshing reviews:", refreshError);
        }
      }
    } catch (error) {
      console.error("Review submission error:", error);
      toast.error("Đã xảy ra lỗi khi gửi đánh giá. Vui lòng thử lại sau.");
    } finally {
      setSubmitLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Review Form Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Đánh giá từ khách hàng</h3>
        {localStorage.getItem("token") ? (
          hasReviewed ? (
            <span className="text-sm text-gray-500">
              Bạn đã đánh giá sản phẩm này
            </span>
          ) : (
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              {showReviewForm ? "Hủy đánh giá" : "Viết đánh giá"}
            </button>
          )
        ) : (
          <button
            onClick={handleLoginRequired}
            className="text-sm font-medium text-black hover:text-blue-800"
          >
            Đăng nhập để đánh giá
          </button>
        )}
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <form
          onSubmit={handleSubmitReview}
          className="space-y-4 bg-gray-50 p-4 rounded-lg"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Đánh giá sao
            </label>
            <div className="flex mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setReviewForm((prev) => ({
                      ...prev,
                      rating: star,
                    }))
                  }
                >
                  <Star
                    size={24}
                    className={
                      reviewForm.rating >= star
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    }
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nội dung đánh giá
            </label>
            <textarea
              name="description"
              rows="4"
              value={reviewForm.description}
              onChange={handleReviewChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => setShowReviewForm(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 mr-2"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 flex items-center"
              disabled={submitLoading}
            >
              {submitLoading && <Loader2 size={16} className="animate-spin mr-2" />}
              {submitLoading ? "Đang gửi..." : "Gửi đánh giá"}
            </button>
          </div>
        </form>
      )}

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