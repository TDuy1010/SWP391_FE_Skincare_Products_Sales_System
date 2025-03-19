/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  requestPasswordReset,
  verifyOTPAndResetPassword,
} from "../../../service/forgotPass";
import OTPModal from "./OTPmodal";

const ForgotPasswordForm = ({ onBackToLogin }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await requestPasswordReset(email);

      if (response.error || response.code !== 200) {
        setError(response.message || "Failed to send OTP. Please try again.");
      } else {
        setSuccess("OTP has been sent to your email.");
        setShowOTPModal(true);
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerify = async (otp) => {
    if (!showPasswordFields) {
      // First OTP verification - show password fields
      setShowPasswordFields(true);
      setShowOTPModal(false);
      return;
    }

    // Password validation
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await verifyOTPAndResetPassword(email, otp, newPassword);

      if (response.error || response.code !== 200) {
        setError(
          response.message || "Failed to reset password. Please try again."
        );
      } else {
        setSuccess("Password has been reset successfully!");
        setShowOTPModal(false);
        // Redirect to login after 2 seconds
        setTimeout(() => {
          onBackToLogin();
        }, 2000);
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Đặt lại mật khẩu</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}

      {!showPasswordFields ? (
        <>
          <p className="text-sm text-gray-600">
            Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn mã OTP để đặt
            lại mật khẩu.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                placeholder="Địa chỉ Email"
                className="w-full p-3 border-b border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-gray-900 placeholder-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 bg-black text-white text-sm font-semibold rounded-md hover:bg-gray-800 transition"
              disabled={isLoading}
            >
              {isLoading ? "Đang gửi..." : "Gửi mã OTP"}
            </button>
          </form>
        </>
      ) : (
        <>
          <p className="text-sm text-gray-600">
            Vui lòng nhập mật khẩu mới của bạn.
          </p>

          <form className="space-y-6">
            <div>
              <input
                type="password"
                placeholder="Mật khẩu mới"
                className="w-full p-3 border-b border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-gray-900 placeholder-gray-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Xác nhận mật khẩu mới"
                className="w-full p-3 border-b border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-gray-900 placeholder-gray-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="button"
              className="w-full px-4 py-3 bg-black text-white text-sm font-semibold rounded-md hover:bg-gray-800 transition"
              onClick={() => setShowOTPModal(true)}
              disabled={isLoading}
            >
              Xác nhận OTP và đặt lại mật khẩu
            </button>
          </form>
        </>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 mb-4">Bạn đã nhớ mật khẩu?</p>
        <button
          onClick={onBackToLogin}
          className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
        >
          Quay lại đăng nhập
          <span className="ml-2">→</span>
        </button>
      </div>

      <OTPModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onVerify={handleOTPVerify}
      />
    </div>
  );
};

export default ForgotPasswordForm;
