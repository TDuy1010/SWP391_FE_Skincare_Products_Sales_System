import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  verifyVNPayPayment,
  confirmPaymentSuccess,
} from "../../../../service/checkout";
import { toast } from "react-hot-toast";
import { instance } from "../../../../service/instance";

const VNPayReturn = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);

        const responseCode = queryParams.get("vnp_ResponseCode");
        const orderInfo = queryParams.get("vnp_OrderInfo");
        const orderId = queryParams.get("vnp_TxnRef");

        // Xác thực thanh toán VNPay
        const response = await verifyVNPayPayment(location.search);
        console.log("Verify payment response:", response);

        if (responseCode === "00" || response.code === 200) {
          toast.success(response.message || "Thanh toán thành công!");

          // Gọi API payment-success trực tiếp
          try {
            const paymentData = {
              additionalProp1: orderId || response.result?.orderId,
              additionalProp2: orderInfo || response.result?.orderInfo,
              additionalProp3: "success",
            };

            console.log("Calling payment-success API with data:", paymentData);

            const paymentResponse = await instance.post(
              "/orders/payment-success",
              paymentData,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "Content-Type": "application/json",
                },
              }
            );

            console.log("Payment success API response:", paymentResponse);
            toast.success("Đã cập nhật trạng thái đơn hàng thành công");

            // Tạm thời tắt chuyển hướng để kiểm tra API
            // setTimeout(() => {
            //   navigate("/order-success", {
            //     state: {
            //       orderId: orderId || response.result?.orderId,
            //       message: response.message || "Thanh toán thành công!",
            //       orderInfo: orderInfo || response.result?.orderInfo,
            //     },
            //   });
            // }, 1000); // Đợi 1 giây để đảm bảo API đã hoàn thành
          } catch (confirmError) {
            console.error("Payment success API error:", confirmError);
            toast.error("Có lỗi xảy ra khi cập nhật trạng thái đơn hàng");

            // Tạm thời tắt chuyển hướng để kiểm tra API
            // setTimeout(() => {
            //   navigate("/order-success", {
            //     state: {
            //       orderId: orderId || response.result?.orderId,
            //       message: response.message || "Thanh toán thành công!",
            //       orderInfo: orderInfo || response.result?.orderInfo,
            //     },
            //   });
            // }, 1000);
          }
        } else {
          toast.error(response.message || "Thanh toán thất bại!");

          navigate("/order-failed", {
            state: {
              message: response.message || "Thanh toán thất bại!",
              orderId: orderId || response.result?.orderId,
            },
          });
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        toast.error("Có lỗi xảy ra trong quá trình xác thực thanh toán");

        navigate("/order-failed", {
          state: {
            message: "Có lỗi xảy ra trong quá trình xác thực thanh toán",
          },
        });
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
