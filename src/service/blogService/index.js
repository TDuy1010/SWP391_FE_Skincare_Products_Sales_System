import { instance } from "../instance";

// Public function - no token needed
export const getAllBlogs = async (params) => {
  try {
    const token = localStorage.getItem("token");
    const response = await instance.get("admin/blogs", {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Kiểm tra response từ API
    if (response.code === 200) {
      return {
        error: false,
        result: response.result,
        message: response.message,
      };
    } else {
      return {
        error: true,
        message: response.message || "Có lỗi xảy ra khi lấy danh sách blog",
      };
    }
  } catch (error) {
    console.error("Get blogs error:", error);
    return {
      error: true,
      message: error.response?.data?.message || "Không thể kết nối đến server",
    };
  }
};

// Admin functions - require token
export const getBlogById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await instance.get(`admin/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Kiểm tra response từ API
    if (response.code === 200) {
      return {
        error: false,
        result: response.result,
        message: response.message,
      };
    } else {
      return {
        error: true,
        message: response.message || "Không thể lấy thông tin blog",
      };
    }
  } catch (error) {
    console.error("Get blog error:", error);
    return {
      error: true,
      message: error.response?.data?.message || "Không thể kết nối đến server",
    };
  }
};

export const addBlog = async (formData) => {
  try {
    const token = localStorage.getItem("token");

    // Lấy và tối ưu dữ liệu
    const title = formData.get("title");
    const content = formData.get("content");
    const imageFile = formData.get("image");

    // Kiểm tra kích thước content
    if (content && content.length > 1000000) {
      // Ví dụ giới hạn 1MB
      return {
        error: true,
        message: "Nội dung blog quá lớn, vui lòng giảm kích thước",
      };
    }

    // Upload ảnh lên Cloudinary nếu có
    let imageUrl = null;
    if (imageFile) {
      try {
        imageUrl = await uploadToCloudinary(imageFile);
      } catch (error) {
        console.error("Upload image error:", error);
        throw new Error("Không thể tải ảnh lên");
      }
    }

    // Tạo payload theo cấu trúc API
    const payload = {
      title,
      content,
      image: imageUrl,
    };

    const response = await instance.post("admin/blogs", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.code === 201) {
      // Kiểm tra mã 201 Created
      return {
        error: false,
        result: response.result,
        message: response.message,
      };
    } else {
      return {
        error: true,
        message: response.message || "Không thể tạo blog",
      };
    }
  } catch (error) {
    console.error("Add blog error:", error);
    // Thêm log chi tiết hơn
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    }
    return {
      error: true,
      message: error.response?.data?.message || "Không thể kết nối đến server",
    };
  }
};

export const updateBlog = async (id, formData) => {
  try {
    const token = localStorage.getItem("token");

    // Lấy và tối ưu dữ liệu
    const title = formData.get("title");
    const content = formData.get("content");
    const imageFile = formData.get("image");

    // Kiểm tra kích thước content
    if (content && content.length > 1000000) {
      return {
        error: true,
        message: "Nội dung blog quá lớn, vui lòng giảm kích thước",
      };
    }

    // Upload ảnh lên Cloudinary nếu có file ảnh mới
    let imageUrl = formData.get("currentImage"); // Lấy ảnh hiện tại
    if (imageFile) {
      try {
        imageUrl = await uploadToCloudinary(imageFile);
      } catch (error) {
        console.error("Upload image error:", error);
        throw new Error("Không thể tải ảnh lên");
      }
    }

    // Tạo payload theo cấu trúc API yêu cầu
    const payload = {
      title,
      content,
      image: imageUrl,
    };

    const response = await instance.put(`admin/blogs/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.code === 200) {
      return {
        error: false,
        result: response.result,
        message: response.message,
      };
    } else {
      return {
        error: true,
        message: response.message || "Không thể cập nhật blog",
      };
    }
  } catch (error) {
    console.error("Update blog error:", error);
    return {
      error: true,
      message: error.response?.data?.message || "Không thể kết nối đến server",
    };
  }
};

export const deleteBlog = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await instance.delete(`admin/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      error: false,
      result: response.result,
      message: response.message,
    };
  } catch (error) {
    console.error("Delete blog error:", error);
    return {
      error: true,
      message: error.response?.data?.message || "Failed to delete blog",
    };
  }
};

export const changeBlogStatus = async (blogId, status) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return {
        error: true,
        message: "Vui lòng đăng nhập lại",
      };
    }

    await instance.patch(
      `admin/blogs/change-status/${blogId}?status=${status}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Trả về kết quả thành công mà không cần kiểm tra response.data
    return {
      error: false,
      message: "Thay đổi trạng thái blog thành công",
    };
  } catch (error) {
    console.error("Change blog status error:", error);

    if (error.response?.status === 401 || error.response?.data?.code === 1201) {
      localStorage.removeItem("token");
      return {
        error: true,
        message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại",
      };
    }

    return {
      error: true,
      message: "Không thể thay đổi trạng thái blog",
    };
  }
};

// Reuse the Cloudinary upload function
const uploadToCloudinary = async (file) => {
  try {
    const CLOUDINARY_UPLOAD_PRESET = "phuocnt-cloudinary";
    const CLOUDINARY_CLOUD_NAME = "dl5dphe0f";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};
