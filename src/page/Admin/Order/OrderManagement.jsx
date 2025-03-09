import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";

const OrderManagement = () => {

    const [orders, setOrders] = useState([
        { orderId: '2003', customer: 'Le Thanh Tai', date: '25/11/2024', phone: '0909 113 114', location: 'Thu Duc', method: 'VNPAY', price: '250.000', status: 'COMPLETED' },
        { orderId: '2003', customer: 'Le Thanh Tai', date: '25/11/2024', phone: '0909 113 114', location: 'Thu Duc', method: 'VNPAY', price: '250.000', status: 'PENDING' }
    ]);

    const status = ['COMPLETED', 'CANCELLED', 'PENDING'];
    const [editingId, setEditingId] = useState(null);
    const [originalOrder, setOriginalOrder] = useState(null);
    const [showModal, setShowModal] = useState({ show: false, type: null, index: null });

    const handleAction = (type, index, data) => {
        switch(type) {
            case 'edit':
                setEditingId(index);
                setOriginalOrder({...orders[index]});
                break;
            case 'save':
                if (isOrderChanged(data, originalOrder)) {
                    setOrders(orders.map((o, i) => i === index ? data : o));
                    setEditingId(null);
                    setShowModal({ show: true, type: 'notification', index: null });
                    setTimeout(() => setShowModal({ show: false, type: null, index: null }), 2000);
                }
                break;
        }
    };

    const isOrderChanged = (current, original) => 
        JSON.stringify(current) !== JSON.stringify(original);

    const Modal = () => {
        if (!showModal.show || showModal.type !== 'notification') return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-[#182237] p-6 rounded-lg shadow-xl">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-white mb-2">Notification</h3>
                        <p className="text-white">Order updated successfully!</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div>
                <h2 className="text-2xl text-black font-bold mb-4">Orders</h2>
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
                                    <td className="py-4 px-2">
                                        {editingId === index ? (
                                            <select
                                                className="bg-slate-800 text-white p-1 rounded"
                                                value={order.status}
                                                onChange={(e) => {
                                                    const newOrders = [...orders];
                                                    newOrders[index] = { ...order, status: e.target.value };
                                                    setOrders(newOrders);
                                                }}
                                            >
                                                {status.map((s) => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <span className={`px-2 py-1 rounded ${
                                                order.status === 'COMPLETED' ? 'bg-green-500' :
                                                order.status === 'CANCELLED' ? 'bg-red-500' :
                                                'bg-yellow-500'
                                            } text-white`}>
                                                {order.status}
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-4 px-2">
                                        {editingId === index ? (
                                            <>
                                                <button 
                                                    className={`flex items-center px-3 py-1 rounded-md mr-2 ${
                                                        isOrderChanged(order, originalOrder)
                                                        ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
                                                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                                    }`}
                                                    onClick={() => handleAction('save', index, order)}
                                                >
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Save
                                                </button>
                                                <button 
                                                    className="flex items-center px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 text-white"
                                                    onClick={() => setEditingId(null)}
                                                >
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <button 
                                                className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-900 transition-all duration-200 group"
                                                onClick={() => handleAction('edit', index)}
                                            >
                                                <FaRegEdit 
                                                    className="text-green-500 group-hover:text-green-600 group-hover:scale-110 transition-all duration-200" 
                                                    size={18} 
                                                />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal />
        </>
    )
}

export default OrderManagement
