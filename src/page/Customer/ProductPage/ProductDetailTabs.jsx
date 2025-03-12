/* eslint-disable react/prop-types */

import { Star, Loader2 } from "lucide-react";
import ReviewFilter from "./ReviewFilter";

// TabButton component definition
const TabButton = ({ isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`pb-4 text-sm font-medium border-b-2 ${
      isActive
        ? "border-black text-black"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    }`}
  >
    {children}
  </button>
);

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

// ReviewItem component definition
const ReviewItem = ({ review }) => {
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

// Helper function to safely render HTML content
const createMarkup = (htmlContent) => {
  return { __html: htmlContent || "" };
};

// Main ProductDetailTabs component
const ProductDetailTabs = ({ 
  activeTab,
  setActiveTab,
  product,
  productSpecs,
  reviews,
  filteredReviews,
  showReviewForm,
  setShowReviewForm,
  reviewForm,
  setReviewForm,
  hasReviewed,
  handleLoginRequired,
  submitLoading,
  handleSubmitReview,
  handleReviewChange,
  handleFilterChange,
  createMarkup
}) => {
  return (
    <div className="mt-6 pt-6">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-6 overflow-x-auto pb-px">
          <TabButton
            isActive={activeTab === "description"}
            onClick={() => setActiveTab("description")}
          >
            Mô tả
          </TabButton>
          <TabButton
            isActive={activeTab === "parameters"}
            onClick={() => setActiveTab("parameters")}
          >
            Thông số
          </TabButton>
          <TabButton
            isActive={activeTab === "usage"}
            onClick={() => setActiveTab("usage")}
          >
            Cách sử dụng
          </TabButton>
          <TabButton
            isActive={activeTab === "ingredients"}
            onClick={() => setActiveTab("ingredients")}
          >
            Thành phần
          </TabButton>
          <TabButton
            isActive={activeTab === "reviews"}
            onClick={() => setActiveTab("reviews")}
          >
            Đánh giá ({reviews.length})
          </TabButton>
        </nav>
      </div>

      <div className="py-4">
        {/* Description Tab */}
        {activeTab === "description" && (
          <div className="prose prose-sm max-w-none">
            <div
              dangerouslySetInnerHTML={createMarkup(product.description)}
            />
          </div>
        )}

        {/* Parameters Tab */}
        {activeTab === "parameters" && (
          <div className="overflow-hidden bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="divide-y divide-gray-200">
                {productSpecs.parameters.map((param, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="py-3 px-4 text-sm font-medium text-gray-900 w-1/3">
                      {param.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {param.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Usage Tab */}
        {activeTab === "usage" && (
          <div className="space-y-4">
            <ol className="list-decimal pl-5 space-y-2">
              {productSpecs.usage.map((step, idx) => (
                <li key={idx} className="text-gray-600">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Ingredients Tab */}
        {activeTab === "ingredients" && (
          <div className="space-y-4">
            <p className="text-gray-600">{productSpecs.ingredients}</p>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
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
        )}
      </div>
    </div>
  );
};

export default ProductDetailTabs;
export { ReviewItem, TabButton };  // Export thêm các component con nếu cần