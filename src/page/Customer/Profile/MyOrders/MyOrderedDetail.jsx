import React from "react";

const OrderDetail = ({ order, customer, onBack }) => {
  if (!order || !customer) return null;

  return (
    <div className="">
      <button onClick={onBack} className="text-blue-600 mb-4 flex items-center">
        &larr; Trở lại
      </button>
      <h3 className="text-lg font-semibold mt-4 bg-blue-100 p-2 rounded-md">Chi Tiết Đơn Hàng</h3>
<div className="grid grid-cols-2 gap-4 p-3 bg-gray-100 rounded-md">
  {/* Thông tin khách hàng */}
  <div className="p-4 bg-gray-100 rounded-md">
    <p className="text-gray-700"><strong>Tên khách hàng:</strong> {customer.name}</p>
    <p className="text-gray-700"><strong>Số điện thoại:</strong> {customer.phone}</p>
    <p className="text-gray-700"><strong>Địa chỉ:</strong> {customer.address}, {customer.ward}, {customer.district}, {customer.city}</p>
  </div>

  {/* Thông tin đơn hàng */}
  <div className="p-4 bg-gray-100 rounded-md">
    <p className="text-gray-700"><strong>Mã đơn hàng:</strong> #{order.id} <span className="text-green-600 font-medium">| Mua Hàng</span></p>
    <p className="text-gray-700"><strong>Ngày đặt:</strong> {order.date}</p>
    <p className="text-gray-700"><strong>Trạng thái đơn hàng:</strong> {order.status}</p>
    <p className="text-gray-700"><strong>Hình thức thanh toán:</strong> VN Pay</p>
  </div>
</div>

      {/* Ghi chú */}
      <div className="text-center mt-4 bg-gray-100 p-2 rounded-md">
        Hàng dễ vỡ, đặt tiền, gọi điện rồi xuống nhận hàng
      </div>

      {/* Chi tiết sản phẩm */}
      <h3 className="text-lg font-semibold mt-4 bg-blue-100 p-2 rounded-md">Chi Tiết Sản Phẩm</h3>
      <div className="p-4">
        {order.items.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
            <div className="flex items-center">
              <img
                src="https://hoatuongvyspa.com/upload/product/sua-rua-mat-sinh-hoc-amytas-952.png" // Placeholder hình ảnh
                alt={item.name}
                className="w-12 h-12 object-cover rounded mr-4"
              />
              <span>{item.name} x {item.quantity}</span>
            </div>
            <span className="font-semibold">{(item.price * item.quantity).toLocaleString()} đ</span>
          </div>
        ))}
      </div>

      {/*Tổng tiền */}
      <div className="mt-4 p-4">
        <p className="flex justify-between">
          <span>Giảm giá:</span>
          <span className="text-red-500">-10.000đ</span>
        </p>
        <p className="flex justify-between font-semibold text-lg">
          <span>Total:</span>
          <span>{order.total.toLocaleString()} đ</span>
        </p>
      </div>

      {/*hủy đơn hàng */}
      <div className="mt-4 flex justify-end">
        <button className="px-6 py-1 bg-red-600 text-white rounded">Hủy đơn hàng</button>
      </div>
    </div>
  );
};

export default OrderDetail;
