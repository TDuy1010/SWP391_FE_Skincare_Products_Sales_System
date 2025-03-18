import React, { useState } from 'react';
import { Star, Loader2, X } from "lucide-react";
import { addProductFeedback } from "../../../../service/feedback";
import { toast } from "react-toastify";

const RatingStars = ({ rating = 5, size = 16, onRatingChange }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => onRatingChange?.(i + 1)}
      >
        <Star
          size={size}
          className={
            i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
          }
        />
      </button>
    ))}
  </div>
);

const FeedbackModal = ({ isOpen, onClose, product, onSuccess }) => {
  const [reviewForm, setReviewForm] = useState({
    description: "",
    rating: 5,
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  // Thêm log để kiểm tra dữ liệu nhận được
  console.log("Product received in modal:", product);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (newRating) => {
    setReviewForm((prev) => ({ ...prev, rating: newRating }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    console.log("Submitting review for product:", product);
    
    const { orderId, orderItemId, productId } = product;
    
    if (!orderId || !orderItemId || !productId) {
      console.error("Missing required IDs. Product data:", product);
      toast.error("Không thể xác định thông tin để gửi đánh giá");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Vui lòng đăng nhập để đánh giá");
      return;
    }

    setSubmitLoading(true);

    try {
      const response = await addProductFeedback(orderId, orderItemId, productId, {
        description: reviewForm.description.trim(),
        rating: parseInt(reviewForm.rating)
      });

      if (response.error) {
        if (response.requireAuth) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
        } else if (response.alreadyReviewed) {
          toast.warning("Bạn đã đánh giá sản phẩm này rồi");
        } else {
          toast.error(response.message || "Không thể gửi đánh giá");
        }
      } else {
        toast.success("Cảm ơn bạn đã đánh giá sản phẩm!");
        setReviewForm({ description: "", rating: 5 });
        // Truyền orderItemId khi đóng modal để cập nhật trạng thái
        onClose(orderItemId);
      }
    } catch (error) {
      console.error("Review submission error:", error);
      toast.error("Đã xảy ra lỗi khi gửi đánh giá. Vui lòng thử lại sau.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Đánh giá sản phẩm</h2>
        
        <div className="flex items-center mb-6">
          <img
            src={product.thumbnailProduct}
            alt={product.productName}
            className="w-16 h-16 object-cover rounded-md mr-4"
          />
          <div>
            <h3 className="font-medium">{product.productName}</h3>
          </div>
        </div>

        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Đánh giá của bạn
            </label>
            <RatingStars
              rating={reviewForm.rating}
              size={24}
              onRatingChange={handleRatingChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nhận xét chi tiết
            </label>
            <textarea
              name="description"
              rows="4"
              value={reviewForm.description}
              onChange={handleReviewChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
              required
            />
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 flex items-center justify-center disabled:bg-gray-400"
              disabled={submitLoading}
            >
              {submitLoading && <Loader2 size={16} className="animate-spin mr-2" />}
              {submitLoading ? "Đang gửi..." : "Gửi đánh giá"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;