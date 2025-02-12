import { instance } from "../instance";

export const logout = async (token) => {
  try {
    const response = await instance.post("auth/logout", {
      token,
    });
    return response;
  } catch (error) {
    console.error("Login error:", error);

    return {
      error: true,
      message: error.response?.message || "Login failed",
    };
  }
};
