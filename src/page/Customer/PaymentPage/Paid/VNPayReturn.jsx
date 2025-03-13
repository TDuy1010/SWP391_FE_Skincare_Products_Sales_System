import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyVNPayPayment } from "../../../../service/checkout";
import { toast } from "react-hot-toast";

const VNPayReturn = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Lấy query params từ URL callback
        const queryParams = new URLSearchParams(location.search);

        // Kiểm tra response code từ VNPay
        const responseCode = queryParams.get("vnp_ResponseCode");
        const orderInfo = queryParams.get("vnp_OrderInfo");
        const orderId = queryParams.get("vnp_TxnRef");

        console.log("VNPay callback params:", {
          responseCode,
          orderInfo,
          orderId,
          fullQuery: location.search,
        });

        // Gọi API để verify payment
        const response = await verifyVNPayPayment(location.search);
        console.log("Verify payment response:", response);

        // Kiểm tra cả responseCode từ VNPay và code từ API
        if (responseCode === "00" || response.code === 200) {
          // Thanh toán thành công
          toast.success(response.message || "Thanh toán thành công!");

          // Chuyển hướng đến trang order-success
          setTimeout(() => {
            navigate("/order-success", {
              state: {
                orderId: orderId || response.result?.orderId,
                message: response.message || "Thanh toán thành công!",
                orderInfo: orderInfo || response.result?.orderInfo,
              },
            });
          }, 1000); // Đợi 1 giây để toast hiển thị
        } else {
          // Thanh toán thất bại
          toast.error(response.message || "Thanh toán thất bại!");

          setTimeout(() => {
            navigate("/order-failed", {
              state: {
                message: response.message || "Thanh toán thất bại!",
                orderId: orderId || response.result?.orderId,
              },
            });
          }, 1000);
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        toast.error("Có lỗi xảy ra trong quá trình xác thực thanh toán");

        setTimeout(() => {
          navigate("/order-failed", {
            state: {
              message: "Có lỗi xảy ra trong quá trình xác thực thanh toán",
            },
          });
        }, 1000);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [location, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-xl mb-4">Đang xử lý thanh toán...</div>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </div>
    );
  }

  return null;
};

export default VNPayReturn;
