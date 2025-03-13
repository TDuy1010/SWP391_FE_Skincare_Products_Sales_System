import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:8080/api/v1/swp391-skincare-products-sales-system",
  withCredentials: true,
  timeout: 30000, // Tăng timeout lên 30 giây
  maxContentLength: Infinity, // Cho phép kích thước payload không giới hạn
  maxBodyLength: Infinity, // Cho phép kích thước body không giới hạn
});

instance.interceptors.response.use(function (response) {
  return response.data;
});
