import axios from "axios";

export const instance = axios.create({
  baseURL:
    "https://swp391-skincare-products-sales-system.onrender.com/api/v1/swp391-skincare-products-sales-system",
  withCredentials: true,
});

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    console.error("API Error:", error);
    return Promise.reject(error); // Đảm bảo lỗi vẫn được ném ra
  }
);
