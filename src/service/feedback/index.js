import { instance } from "../instance";

/**
 * Thêm đánh giá mới cho sản phẩm (yêu cầu xác thực)
 * @param {object} feedbackData - Dữ liệu đánh giá
 * @returns {Promise} - Promise chứa kết quả API
 */
export const addProductFeedback = async (productId, feedbackData) => {
  try {
    // Lấy token mới nhất từ localStorage
    const token = localStorage.getItem("token");
    
    if (!token) {
      return {
        error: true,
        message: "Vui lòng đăng nhập để đánh giá sản phẩm",
        requireAuth: true
      };
    }
    
    // Log để debug
    console.log("Token for feedback:", token.substring(0, 15) + "...");
    console.log("Product ID:", productId);
    console.log("Request data:", feedbackData);
    
    // Loại bỏ tiền tố "Bearer " nếu đã có sẵn trong token
    const authToken = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
    
    // Chuẩn bị dữ liệu gửi đi theo đúng định dạng API
    // Không gửi productId trong body nữa mà chỉ gửi description và rating
    const formattedData = {
      description: feedbackData.description,
      rating: Number(feedbackData.rating) // Đảm bảo rating là số
    };
    
    console.log("Formatted data:", formattedData);
    
    // Gửi request đến API endpoint đúng - sử dụng /feedbacks/{productId}
    const response = await instance.post(`/feedbacks/${productId}`, formattedData, {
      headers: {
        Authorization: authToken,
        "Content-Type": "application/json"
      }
    });
    
    return response;
  } catch (error) {
    console.error("Feedback API Error:", error);
    
    // Lấy chi tiết lỗi từ response nếu có
    const errorDetails = error.response?.data;
    console.log("Error details from server:", errorDetails);
    
    // Xử lý lỗi phụ thuộc vào HTTP status code
    if (error.response?.status === 401 || 
        (error.response?.data?.code === 1201 && 
         error.response?.data?.message === "Unauthenticated")) {
      // Xóa token không hợp lệ
      localStorage.removeItem("token");
      
      return {
        error: true,
        message: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại để thực hiện chức năng này.",
        requireAuth: true,
        code: 1201
      };
    } else if (error.response?.status === 403) {
      return {
        error: true,
        message: "Bạn không có quyền thực hiện chức năng này.",
        forbidden: true
      };
    } else if (error.response?.status === 400) {
      // Lỗi dữ liệu đầu vào
      return {
        error: true,
        message: errorDetails?.message || "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.",
        validationError: true,
        details: errorDetails?.details || errorDetails
      };
    } else if (error.response?.status === 500) {
      // Internal Server Error
      return {
        error: true,
        message: "Lỗi hệ thống. Vui lòng thử lại sau hoặc liên hệ hỗ trợ.",
        serverError: true,
        details: errorDetails
      };
    }
    
    // Trả về lỗi mặc định nếu không khớp với các trường hợp trên
    return {
      error: true,
      message: error.response?.data?.message || "Không thể gửi đánh giá. Vui lòng thử lại sau.",
      details: errorDetails
    };
  }
};

/**
 * Cập nhật trạng thái "hữu ích" của một đánh giá
 * @param {number} feedbackId - ID của đánh giá
 * @returns {Promise} - Promise chứa kết quả API
 */
export const markFeedbackAsHelpful = async (feedbackId) => {
  try {
    // Lấy token mới nhất từ localStorage trong thời điểm gọi hàm
    const token = localStorage.getItem("token");
    
    if (!token) {
      return {
        error: true,
        message: "Vui lòng đăng nhập để đánh dấu đánh giá hữu ích",
        requireAuth: true
      };
    }
    
    // Giả lập API call vì backend chưa có endpoint này
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 200,
          message: "Đánh dấu thành công",
          result: {
            id: feedbackId,
            helpfulCount: 1
          }
        });
      }, 300);
    });
  } catch (error) {
    console.error("Mark helpful error:", error);
    return {
      error: true,
      message: "Không thể đánh dấu đánh giá là hữu ích.",
    };
  }
};