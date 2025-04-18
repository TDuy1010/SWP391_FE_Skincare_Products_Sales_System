import React, { useState, useEffect } from "react";
import { addProductFeedback } from "../../../../service/feedback";
import { toast } from "react-toastify";

const MyOrderedDetail = ({ order, onBack }) => {
  const [feedbackData, setFeedbackData] = useState({
    productId: null,
    orderItemId: null,
    description: "",
    rating: 5,
  });
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tạo một bản sao của order để làm việc với nó
  const [orderData, setOrderData] = useState(order);

  // Khi component mount, kiểm tra localStorage để lấy dữ liệu đánh giá đã lưu
  useEffect(() => {
    if (order) {
      const storedFeedbacks = localStorage.getItem(
        `feedbacks_${order.orderId}`
      );
      if (storedFeedbacks) {
        const parsedFeedbacks = JSON.parse(storedFeedbacks);

        // Cập nhật orderData với thông tin đánh giá từ localStorage
        const updatedItems = order.orderResponseItemList.map((item) => {
          const savedFeedback = parsedFeedbacks.find(
            (f) => f.orderItemId === item.id
          );
          if (savedFeedback) {
            return {
              ...item,
              hasFeedback: true,
              feedbackRating: savedFeedback.rating,
              feedbackDescription: savedFeedback.description,
            };
          }
          return item;
        });

        setOrderData({ ...order, orderResponseItemList: updatedItems });
      } else {
        setOrderData(order);
      }
    }
  }, [order]);

  if (!orderData) return null;

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!feedbackData.productId) {
        toast.error("Thiếu thông tin sản phẩm");
        setIsSubmitting(false);
        return;
      }

      const response = await addProductFeedback(
        feedbackData.productId,
        orderData.orderId,
        feedbackData.orderItemId,
        {
          description: feedbackData.description,
          rating: parseInt(feedbackData.rating),
        }
      );

      if (!response.error) {
        toast.success("Đánh giá sản phẩm thành công!");

        // Cập nhật trạng thái hasFeedback cho sản phẩm đã đánh giá
        const updatedItems = orderData.orderResponseItemList.map((item) => {
          if (item.id === feedbackData.orderItemId) {
            return {
              ...item,
              hasFeedback: true,
              feedbackRating: parseInt(feedbackData.rating),
              feedbackDescription: feedbackData.description,
            };
          }
          return item;
        });

        // Lưu thông tin đánh giá vào localStorage
        const storedFeedbacks = localStorage.getItem(
          `feedbacks_${orderData.orderId}`
        );
        let feedbacks = storedFeedbacks ? JSON.parse(storedFeedbacks) : [];

        // Thêm đánh giá mới hoặc cập nhật đánh giá cũ
        const feedbackIndex = feedbacks.findIndex(
          (f) => f.orderItemId === feedbackData.orderItemId
        );
        if (feedbackIndex >= 0) {
          feedbacks[feedbackIndex] = {
            orderItemId: feedbackData.orderItemId,
            rating: parseInt(feedbackData.rating),
            description: feedbackData.description,
          };
        } else {
          feedbacks.push({
            orderItemId: feedbackData.orderItemId,
            rating: parseInt(feedbackData.rating),
            description: feedbackData.description,
          });
        }

        localStorage.setItem(
          `feedbacks_${orderData.orderId}`,
          JSON.stringify(feedbacks)
        );

        // Cập nhật state
        setOrderData({ ...orderData, orderResponseItemList: updatedItems });
        setShowFeedbackForm(false);
        setFeedbackData({
          productId: null,
          orderItemId: null,
          description: "",
          rating: 5,
        });
      } else {
        toast.error(response.message || "Không thể gửi đánh giá");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi gửi đánh giá");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openFeedbackForm = (item, index) => {
    const productId = item.productId || `product-${index}`;

    setFeedbackData({
      ...feedbackData,
      productId: productId,
      orderItemId: item.id,
      productName: item.productName,
    });
    setShowFeedbackForm(true);
  };

  // Check if order is completed/done
  const isOrderCompleted =
    orderData.status === "COMPLETED" || orderData.status === "DONE";

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <button
        onClick={onBack}
        className="text-sky-700 hover:text-sky-900 mb-6 flex items-center gap-2 transition-colors"
      >
        <span>&larr;</span>
        <span>Quay lại danh sách đơn hàng</span>
      </button>

      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Đơn hàng #{orderData.orderId}
        </h2>
        <p className="text-gray-600">
          Đặt ngày {new Date(orderData.orderDate).toLocaleDateString()}
        </p>
      </div>

      {/* Order Status Banner */}
      <div
        className={`mb-6 p-4 rounded-lg ${
          orderData.status === "PENDING"
            ? "bg-yellow-50 text-yellow-700"
            : orderData.status === "COMPLETED" || orderData.status === "DONE"
            ? "bg-green-50 text-green-700"
            : orderData.status === "DELIVERING"
            ? "bg-blue-50 text-blue-700"
            : orderData.status === "PROCESSING"
            ? "bg-orange-50 text-orange-700"
            : orderData.status === "DELIVERING_FAIL"
            ? "bg-red-50 text-red-700"
            : orderData.status === "CANCELLED"
            ? "bg-gray-50 text-gray-700"
            : "bg-gray-50 text-gray-700"
        }`}
      >
        <div className="font-semibold">
          Trạng thái:{" "}
          {orderData.status === "PENDING"
            ? "Chờ xử lý"
            : orderData.status === "DONE"
            ? "Hoàn thành"
            : orderData.status === "DELIVERING"
            ? "Đang giao hàng"
            : orderData.status === "PROCESSING"
            ? "Đang xử lý"
            : orderData.status === "DELIVERING_FAIL"
            ? "Giao hàng thất bại"
            : orderData.status === "CANCELLED"
            ? "Đã hủy"
            : orderData.status}
        </div>
      </div>

      {/* Customer and Order Info Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Thông tin khách hàng
          </h3>
          <div className="space-y-3">
            <p className="flex justify-between">
              <span className="text-gray-600">Họ tên:</span>
              <span className="font-medium">{orderData.address.name}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Số điện thoại:</span>
              <span className="font-medium">{orderData.address.phone}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Địa chỉ:</span>
              <span className="font-medium">
                {orderData.address.addressLine}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Thông tin thanh toán
          </h3>
          <div className="space-y-3">
            <p className="flex justify-between">
              <span className="text-gray-600">Phương thức thanh toán:</span>
              <span className="font-medium">{orderData.paymentMethod}</span>
            </p>
            {orderData.paymentStatus && (
              <p className="flex justify-between">
                <span className="text-gray-600">Trạng thái thanh toán:</span>
                <span
                  className={`font-medium ${
                    orderData.paymentStatus === "PAID"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {orderData.paymentStatus === "PAID"
                    ? "Đã thanh toán"
                    : "Chưa thanh toán"}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Product List */}
      {orderData.orderResponseItemList && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Danh sách sản phẩm
          </h3>
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            {orderData.orderResponseItemList.map((item, index) => (
              <div
                key={index}
                className="flex flex-col p-4 border-b last:border-0"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.thumbnailProduct || "placeholder-image-url"}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {item.productName}
                      </h4>
                      <p className="text-gray-600">Số lượng: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-800">
                    {(item.price * item.quantity).toLocaleString()} đ
                  </span>
                </div>

                {/* Feedback button - only show for completed orders */}
                {isOrderCompleted && !item.hasFeedback && (
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => openFeedbackForm(item, index)}
                      className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors text-sm"
                    >
                      Đánh giá sản phẩm
                    </button>
                  </div>
                )}

                {/* Show existing feedback if available */}
                {item.hasFeedback && (
                  <div className="mt-3 bg-gray-100 p-3 rounded-md">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Đánh giá của bạn:</span>
                      <div className="flex text-yellow-400">
                        {[...Array(item.feedbackRating || 5)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                    {item.feedbackDescription && (
                      <p className="text-gray-700">
                        {item.feedbackDescription}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Đánh giá sản phẩm</h3>
            <form onSubmit={handleSubmitFeedback}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Đánh giá sao</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setFeedbackData({ ...feedbackData, rating: star })
                      }
                      className="text-2xl focus:outline-none"
                    >
                      <span
                        className={
                          star <= feedbackData.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nhận xét</label>
                <textarea
                  name="description"
                  value={feedbackData.description}
                  onChange={handleFeedbackChange}
                  className="w-full border rounded-md p-2 min-h-[100px]"
                  placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowFeedbackForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  disabled={isSubmitting}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 disabled:bg-gray-400"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Total and Actions */}
      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-bold text-gray-800">Tổng tiền</span>
          <span className="text-xl font-bold text-gray-800">
            {orderData.totalAmount.toLocaleString()} đ
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyOrderedDetail;
