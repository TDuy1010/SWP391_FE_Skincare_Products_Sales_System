import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";

const OrderManagement = () => {

    const [orders, setOrders] = useState([
        { orderId: '2003', customer: 'Le Thanh Tai', date: '25/11/2024', phone: '0909 113 114', location: 'Thu Duc', method: 'VNPAY', price: '250.000', status: 'COMPLETED' },
        { orderId: '2003', customer: 'Le Thanh Tai', date: '25/11/2024', phone: '0909 113 114', location: 'Thu Duc', method: 'VNPAY', price: '250.000', status: 'PENDING' }
    ]);

    const status = ['COMPLETED', 'CANCELLED', 'PENDING'];

    return (
        <>
            <div>
                <h2 className="text-2xl text-white font-bold mb-4">Orders</h2>
                <div className="bg-slate-700 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <input type="text" placeholder="Search..." className="bg-slate-800 text-white p-2 rounded-lg mr-2" />
                            <select className="bg-slate-800 text-white p-2 rounded-lg">
                                {status.map((status, index) => (
                                    <option key={index}>{status}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-white">
                                <th className="p-2">OrderID</th>
                                <th className="p-2">Customer</th>
                                <th className="p-2">Date</th>
                                <th className="p-2">Location</th>
                                <th className="p-2">Phone Number</th>
                                <th className="p-2">Method</th>
                                <th className="p-2">Price</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index} className="border-t border-white text-gray-200">
                                    <td className="py-4 px-2">{order.orderId}</td>
                                    <td className="py-4 px-2">{order.customer}</td>
                                    <td className="py-4 px-2">{order.date}</td>
                                    <td className="py-4 px-2">{order.location}</td>
                                    <td className="py-4 px-2">{order.phone}</td>
                                    <td className="py-4 px-2">{order.method}</td>
                                    <td className="py-4 px-2">{order.price}</td>
                                    <td className="py-4 px-2">{order.status}</td>
                                    <td className="py-4 px-2">
                                        <FaRegEdit title="view detail" className="text-green-500" size={20} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default OrderManagement
