import { instance } from "../instance";

export const checkout = async (checkoutData) => {
  try {
    const { addressId, cartId, paymentMethod, voucherCode } = checkoutData;
    const response = await instance.post(
      `/orders/checkout?addressId=${addressId}&cartId=${cartId}&paymentMethod=${paymentMethod}${
        voucherCode ? `&voucherCode=${voucherCode}` : ""
      }`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return {
      error: false,
      result: response,
    };
  } catch (error) {
    return {
      error: true,
      message: error.response?.message || "Có lỗi xảy ra khi đặt hàng",
    };
  }
};

export const verifyVNPayPayment = async (queryString) => {
  try {
    const response = await instance.get(
      `/orders/payment-callback${queryString}`
    );

    return {
      code: response.code,
      message: response.message,
      result: {
        orderId: response.result?.orderId,
        orderInfo: response.result?.orderInfo,
      },
    };
  } catch (error) {
    console.error("Payment verification error:", error);
    return {
      code: error.response?.code || 500,
      message:
        error.response?.message || "Có lỗi xảy ra khi xác thực thanh toán",
    };
  }
};

export const confirmPaymentSuccess = async (queryString) => {
  try {
    // Đảm bảo queryString bắt đầu bằng dấu ?
    if (queryString && !queryString.startsWith("?")) {
      queryString = `?${queryString}`;
    }

    console.log(`Calling API: /orders/payment-success${queryString}`);

    const response = await instance.post(
      `/orders/payment-success${queryString}`,
      {}, // Empty request body
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return {
      error: false,
      code: response.code || 200,
      message: response.message || "Xác nhận thanh toán thành công",
      result: response.result,
    };
  } catch (error) {
    console.error("Payment success confirmation error:", error);
    return {
      error: true,
      code: error.response?.code || 500,
      message:
        error.response?.message || "Có lỗi xảy ra khi xác nhận thanh toán",
    };
  }
};
