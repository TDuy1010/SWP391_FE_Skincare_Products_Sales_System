import { instance } from "../instance";

export const getDashboardData = async () => {
  try {
    // Lấy token từ localStorage
    const token = localStorage.getItem("token");

    const response = await instance.get(`/admin/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return {
      error: true,
      message: error.response?.message || "Failed to fetch dashboard data",
    };
  }
};
