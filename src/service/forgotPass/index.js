import { instance } from "../instance";

// Request OTP for password reset
export const requestPasswordReset = async (email) => {
  try {
    const response = await instance.post("auth/forgot-password", {
      email,
    });
    return response;
  } catch (error) {
    console.error("Password reset request error:", error);
    return {
      error: true,
      message: error.response?.data?.message || "Failed to send OTP!",
    };
  }
};

// Verify OTP and reset password
export const verifyOTPAndResetPassword = async (email, otp, newPassword) => {
  try {
    const response = await instance.post("auth/reset-password", {
      email,
      otp,
      newPassword,
    });
    return response;
  } catch (error) {
    console.error("OTP verification error:", error);
    return {
      error: true,
      message: error.response?.data?.message || "Failed to verify OTP!",
    };
  }
};
