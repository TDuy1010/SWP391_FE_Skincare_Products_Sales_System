import { instance } from "../instance";

export const getPublicBlogs = async (params) => {
  try {
    console.log("API Request params:", {
      page: params?.page,
      size: params?.size,
      status: "ACTIVE"
    });

    const response = await instance.get("/blogs", {
      params: {
        page: params?.page || 0,
        size: params?.size || 10,
        status: "ACTIVE",
      },
    });

    console.log("Raw API response:", response);
    console.log("Response data:", response.data);

    if (response && response.code === 200) {
      return {
        error: false,
        result: response.result,
        message: response.message,
      };
    } else {
      return {
        error: true,
        message: response?.message || "Có lỗi xảy ra khi lấy danh sách blog",
      };
    }
  } catch (error) {
    console.error("Get public blogs error:", error);
    return {
      error: true,
      message: error.response?.message || "Không thể kết nối đến server",
    };
  }
};

export const getBlogDetail = async (blogId) => {
  try {
    const response = await instance.get(`/blogs/${blogId}`);

    if (response.code === 200) {
      return {
        error: false,
        result: response.result,
        message: response.message,
      };
    } else {
      return {
        error: true,
        message: response.message || "Có lỗi xảy ra khi lấy chi tiết blog",
      };
    }
  } catch (error) {
    console.error("Get blog detail error:", error);
    return {
      error: true,
      message: error.response?.data?.message || "Không thể kết nối đến server",
    };
  }
};
