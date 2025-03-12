import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaShoppingCart, FaHeadset } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";

const OrderFailed = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8"
      >
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                rotate: [0, 10, -10, 10, -10, 0],
              }}
              transition={{ 
                scale: { duration: 0.5 },
                rotate: { duration: 0.8, delay: 0.5 }
              }}
              className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center"
            >
              <FaExclamationTriangle className="text-red-500 text-5xl" />
            </motion.div>
          </div>
          <h1 className="text-3xl font-light text-gray-900 mb-3">Đặt hàng không thành công</h1>
          <p className="text-gray-600 mb-4">
            Rất tiếc, đã xảy ra lỗi khi xử lý đơn hàng của bạn. Vui lòng thử lại hoặc liên hệ với chúng tôi để được hỗ trợ.
          </p>
        </div>

        <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-8">
          <h3 className="flex items-center text-red-800 text-lg font-medium mb-2">
            <FaExclamationTriangle className="mr-2" /> 
            Lỗi thanh toán
          </h3>
          <p className="text-red-700">
            Giao dịch thanh toán không thành công. Vui lòng kiểm tra lại thông tin thanh toán hoặc thử phương thức thanh toán khác.
          </p>
        </div>

        <div className="border-t border-gray-200 py-6 mb-8">
          <h2 className="text-lg font-medium mb-4">Bạn có thể thử các cách sau</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="bg-gray-100 rounded-full p-2 mr-4 mt-1">
                <MdRefresh className="text-gray-700" />
              </div>
              <div>
                <h3 className="font-medium">Thử lại đơn hàng</h3>
                <p className="text-gray-600 text-sm">Kiểm tra lại thông tin thanh toán và thực hiện lại giao dịch</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-gray-100 rounded-full p-2 mr-4 mt-1">
                <FaShoppingCart className="text-gray-700" />
              </div>
              <div>
                <h3 className="font-medium">Kiểm tra giỏ hàng</h3>
                <p className="text-gray-600 text-sm">Giỏ hàng của bạn vẫn được lưu. Bạn có thể kiểm tra và đặt lại hàng</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-gray-100 rounded-full p-2 mr-4 mt-1">
                <FaHeadset className="text-gray-700" />
              </div>
              <div>
                <h3 className="font-medium">Liên hệ hỗ trợ</h3>
                <p className="text-gray-600 text-sm">Nếu vẫn gặp vấn đề, đội ngũ chăm sóc khách hàng của chúng tôi sẵn sàng hỗ trợ bạn</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <Link 
            to="/checkout"
            className="flex-1 bg-black hover:bg-gray-800 text-white py-3 rounded-lg flex items-center justify-center transition-colors"
          >
            <MdRefresh className="mr-2" />
            Thử lại đặt hàng
          </Link>
          {/* <Link 
            to="/contact"
            className="flex-1 border border-black hover:bg-gray-100 text-black py-3 rounded-lg flex items-center justify-center transition-colors"
          >
            <FaHeadset className="mr-2" />
            Liên hệ hỗ trợ
          </Link> */}
        </div>
      </motion.div>
    </div>
  );
};

export default OrderFailed;