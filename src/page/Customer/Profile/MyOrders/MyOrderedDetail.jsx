import React, { useState, useCallback } from "react";
import FeedbackModal from "./FeedbackModal";
import { toast } from "react-hot-toast";
import { getOrderDetail } from "../../../../service/order";

const MyOrderedDetail = ({ order: initialOrder, onBack }) => {
  const [order, setOrder] = useState(initialOrder);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchOrderDetail = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getOrderDetail(order.orderId);
      if (!response.error) {
        setOrder(response.result);
      } else {
        toast.error("Không thể cập nhật thông tin đơn hàng");
      }
    } catch (error) {
      console.error("Error fetching order detail:", error);
      toast.error("Đã có lỗi xảy ra khi cập nhật đơn hàng");
    } finally {
      setLoading(false);
    }
  }, [order.orderId]);

  if (!order) return null;

  const handleOpenFeedback = (item) => {
    if (item.isFeedback) {
      toast.warning("Bạn đã đánh giá sản phẩm này rồi!");
      return;
    }

    const productData = {
      orderId: order.orderId,
      orderItemId: item.id,
      productId: item.productId,
      productName: item.productName,
      thumbnailProduct: item.thumbnailProduct
    };

    console.log("Product data to be sent:", productData);
    setSelectedProduct(productData);
  };

  const handleCloseFeedback = (updatedItemId = null) => {
    if (updatedItemId) {
      // Cập nhật trạng thái đánh giá của sản phẩm trong state
      setOrder(prevOrder => ({
        ...prevOrder,
        orderResponseItemList: prevOrder.orderResponseItemList.map(item => 
          item.id === updatedItemId ? { ...item, isFeedback: true } : item
        )
      }));
    }
    setSelectedProduct(null);
  };

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
          Đơn hàng #{order.orderId}
        </h2>
        <p className="text-gray-600">
          Đặt ngày {new Date(order.orderDate).toLocaleDateString()}
        </p>
      </div>

      {/* Order Status Banner */}
      <div
        className={`mb-6 p-4 rounded-lg ${
          order.status === "PENDING"
            ? "bg-yellow-50 text-yellow-700"
            : order.status === "DONE"
            ? "bg-green-50 text-green-700"
            : order.status === "PROCESSING"
            ? "bg-indigo-50 text-indigo-700"
            : order.status === "DELIVERING"
            ? "bg-blue-50 text-blue-700"
            : order.status === "DELIVERING_FAIL"
            ? "bg-orange-50 text-orange-700"
            : order.status === "CANCELLED"
            ? "bg-red-50 text-red-700"
            : "bg-gray-50 text-gray-700"
        }`}
      >
        <div className="font-semibold">
          Trạng thái:{" "}
          {order.status === "PENDING"
            ? "Đang xử lý"
            : order.status === "DONE"
            ? "Hoàn thành"
            : order.status === "PROCESSING"
            ? "Đang chuẩn bị"
            : order.status === "DELIVERING"
            ? "Đang giao hàng"
            : order.status === "DELIVERING_FAIL"
            ? "Giao hàng thất bại"
            : order.status === "CANCELLED"
            ? "Đã hủy"
            : order.status}
        </div>
        {order.orderInfo && (
          <div className="mt-2 text-sm">{order.orderInfo}</div>
        )}
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
              <span className="font-medium">{order.address.name}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Số điện thoại:</span>
              <span className="font-medium">{order.address.phone}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">Địa chỉ:</span>
              <span className="font-medium">{order.address.addressLine}</span>
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
              <span className="font-medium">{order.paymentMethod}</span>
            </p>
            {order.paymentStatus && (
              <p className="flex justify-between">
                <span className="text-gray-600">Trạng thái thanh toán:</span>
                <span
                  className={`font-medium ${
                    order.paymentStatus === "PAID"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {order.paymentStatus === "PAID"
                    ? "Đã thanh toán"
                    : "Chưa thanh toán"}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Product List */}
      {order.orderResponseItemList && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Danh sách sản phẩm
          </h3>
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            {order.orderResponseItemList.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-gray-100 transition-colors"
              >
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
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-gray-800">
                    {(item.price * item.quantity).toLocaleString()} đ
                  </span>
                  {!item.isFeedback && (
                    <button
                      onClick={() => handleOpenFeedback(item)}
                      className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Đánh giá
                    </button>
                  )}
                  {item.isFeedback && (
                    <span className="text-green-600 text-sm">
                      Đã đánh giá
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Total and Actions */}
      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-bold text-gray-800">Tổng tiền</span>
          <span className="text-xl font-bold text-gray-800">
            {order.totalAmount.toLocaleString()} đ
          </span>
        </div>
      </div>

      {/* Thêm FeedbackModal */}
      <FeedbackModal
        isOpen={selectedProduct !== null}
        onClose={handleCloseFeedback}
        product={selectedProduct}
        onSuccess={fetchOrderDetail}
      />

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};

export default MyOrderedDetail;
