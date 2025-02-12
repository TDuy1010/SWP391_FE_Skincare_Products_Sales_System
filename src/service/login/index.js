import { instance } from "../instance";

export const login = async (username, password) => {
  try {
    const response = await instance.post("auth/login", {
      username,
      password,
    });

    console.log(response); // Kiểm tra response có dữ liệu hay không
    localStorage.setItem("token", response.result.token);
    localStorage.setItem("username", username);
    return response; // ✅ Return response nếu thành công
  } catch (error) {
    console.error("Login error:", error);

    return {
      error: true,
      message: error.response?.message || "Login failed",
    }; // ✅ Return error object
  }
};
