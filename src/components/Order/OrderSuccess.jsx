import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle, FaShoppingBag, FaRegCreditCard, FaBoxOpen } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";

const OrderSuccess = () => {
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
              animate={{ scale: 1, rotate: [0, 15, -15, 0] }}
              transition={{ 
                scale: { duration: 0.5 },
                rotate: { duration: 0.5, delay: 0.5 }
              }}
              className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"
            >
              <FaCheckCircle className="text-green-600 text-5xl" />
            </motion.div>
          </div>
          <h1 className="text-3xl font-light text-gray-900 mb-3">Đặt hàng thành công!</h1>
          <p className="text-gray-600">
            Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đang được xử lý và sẽ được giao trong thời gian sớm nhất.
          </p>
        </div>

        <div className="border-t border-b border-gray-200 py-6 mb-8">
          <h2 className="text-lg font-medium mb-4">Thông tin đơn hàng</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center mr-4">
                  <FaRegCreditCard />
                </span>
                <span className="text-gray-600">Mã đơn hàng</span>
              </div>
              <span className="font-medium">#ORD-2025031201</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center mr-4">
                  <BiHomeAlt />
                </span>
                <span className="text-gray-600">Địa chỉ giao hàng</span>
              </div>
              <span className="font-medium">123 Đường XYZ, Quận ABC</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center mr-4">
                  <FaBoxOpen />
                </span>
                <span className="text-gray-600">Phương thức vận chuyển</span>
              </div>
              <span className="font-medium">Giao hàng tiêu chuẩn</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-medium mb-4">Tóm tắt đơn hàng</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Tổng tiền hàng</span>
              <span>980.000 VND</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phí vận chuyển</span>
              <span>30.000 VND</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Giảm giá</span>
              <span>-80.000 VND</span>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4 flex justify-between">
            <span className="font-medium">Tổng thanh toán</span>
            <span className="font-medium text-lg">930.000 VND</span>
          </div>
        </div>

        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <Link 
            to="/shop"
            className="flex-1 bg-black hover:bg-gray-800 text-white py-3 rounded-lg flex items-center justify-center transition-colors"
          >
            <FaShoppingBag className="mr-2" />
            Tiếp tục mua sắm
          </Link>
          {/* <Link 
            to="/account/orders"
            className="flex-1 border border-black hover:bg-gray-100 text-black py-3 rounded-lg flex items-center justify-center transition-colors"
          >
            Xem đơn hàng
          </Link> */}
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;