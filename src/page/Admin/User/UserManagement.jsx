import { useState } from 'react'
import { FaUserEdit } from 'react-icons/fa';
import { FaRegTrashCan } from 'react-icons/fa6';
import AddUser from './AddUser';

const UserManagement = () => {
    const [users, setUsers] = useState([
        { username: 'taile03', fullname: 'Le Thanh Tai', email: 'taile03@gmail.com', phone: '0909 113 114', address: 'Thu Duc', points: 50, role: 'Admin' },
        { username: 'phamhieu', fullname: 'Pham Van Tuan Hieu', email: 'phamhieu@gmail.com', phone: '0989 889 889', address: 'Long An', points: 50, role: 'Admin' }
    ]);
    
    const roles = ['Admin', 'User', 'Staff'];
    const [showAddUser, setShowAddUser] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [originalUser, setOriginalUser] = useState(null);
    const [showModal, setShowModal] = useState({ show: false, type: null, index: null });

    const handleAction = (type, index, data) => {
        switch(type) {
            case 'edit':
                setEditingId(index);
                setOriginalUser({...users[index]});
                break;
            case 'save':
                if (isUserChanged(data, originalUser)) {
                    setUsers(users.map((u, i) => i === index ? data : u));
                    setEditingId(null);
                    setShowModal({ show: true, type: 'notification', index: null });
                    setTimeout(() => setShowModal({ show: false, type: null, index: null }), 2000);
                }
                break;
            case 'delete':
                setShowModal({ show: true, type: 'confirm', index });
                break;
            case 'confirmDelete':
                setUsers(users.filter((_, i) => i !== index));
                setShowModal({ show: false, type: null, index: null });
                break;
        }
    };

    const isUserChanged = (current, original) => 
        JSON.stringify(current) !== JSON.stringify(original);

    const handleAddUser = (newUser) => {
        setUsers([...users, newUser]);
        setShowAddUser(false);
    };

    const Modal = () => {
        if (!showModal.show) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-[#182237] p-6 rounded-lg shadow-xl">
                    {showModal.type === 'notification' ? (
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-white mb-2">Notification</h3>
                            <p className="text-white">User updated successfully!</p>
                        </div>
                    ) : (
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-4">Confirm Delete</h3>
                            <p className="text-gray-300 mb-6">Are you sure you want to delete this user?</p>
                            <div className="flex justify-end space-x-4">
                                <button 
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                                    onClick={() => setShowModal({ show: false, type: null, index: null })}
                                >
                                    Cancel
                                </button>
                                <button 
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                    onClick={() => handleAction('confirmDelete', showModal.index)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            <div>
                <h2 className="text-2xl text-white font-bold mb-4">Users</h2>
                <div className="bg-slate-700 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <input type="text" placeholder="Search user" className="bg-slate-800 text-white p-2 rounded-lg mr-2" />
                            <select className="bg-slate-800 text-white p-2 rounded-lg">
                                {roles.map((role, index) => (
                                    <option key={index}>{role}</option>
                                ))}
                            </select>
                        </div>
                        <button className="bg-purple-600 text-white p-2 rounded-lg" onClick={() => setShowAddUser(true)}>+ Add User</button>
                    </div>
                    <div className="overflow-x-auto">
                    <table className="w-full text-left table-auto min-w-full">
                        <thead>
                            <tr className="text-white">
                                <th className="p-2">User name</th>
                                <th className="p-2">Full name</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Phone number</th>
                                <th className="p-2">Address</th>
                                <th className="p-2">Points</th>
                                <th className="p-2">Role</th>
                                <th className="p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className="border-t border-white text-gray-200">
                                    <td className="py-4 px-2">{user.username}</td>
                                    <td className="py-4 px-2">
                                        {editingId === index ? (
                                            <input
                                                type="text"
                                                className="bg-slate-800 text-white p-1 rounded"
                                                value={user.fullname}
                                                onChange={(e) => {
                                                    const newUsers = [...users];
                                                    newUsers[index] = { ...user, fullname: e.target.value };
                                                    setUsers(newUsers);
                                                }}
                                            />
                                        ) : user.fullname}
                                    </td>
                                    <td className="py-4 px-2">
                                        {editingId === index ? (
                                            <input
                                                type="email"
                                                className="bg-slate-800 text-white p-1 rounded"
                                                value={user.email}
                                                onChange={(e) => {
                                                    const newUsers = [...users];
                                                    newUsers[index] = { ...user, email: e.target.value };
                                                    setUsers(newUsers);
                                                }}
                                            />
                                        ) : user.email}
                                    </td>
                                    <td className="py-4 px-2">
                                        {editingId === index ? (
                                            <input
                                                type="text"
                                                className="bg-slate-800 text-white p-1 rounded"
                                                value={user.phone}
                                                onChange={(e) => {
                                                    const newUsers = [...users];
                                                    newUsers[index] = { ...user, phone: e.target.value };
                                                    setUsers(newUsers);
                                                }}
                                            />
                                        ) : user.phone}
                                    </td>
                                    <td className="py-4 px-2">
                                        {editingId === index ? (
                                            <input
                                                type="text"
                                                className="bg-slate-800 text-white p-1 rounded"
                                                value={user.address}
                                                onChange={(e) => {
                                                    const newUsers = [...users];
                                                    newUsers[index] = { ...user, address: e.target.value };
                                                    setUsers(newUsers);
                                                }}
                                            />
                                        ) : user.address}
                                    </td>
                                    <td className="py-4 px-2">{user.points}</td>
                                    <td className="py-4 px-2">
                                        {editingId === index ? (
                                            <select
                                                className="bg-slate-800 text-white p-1 rounded"
                                                value={user.role}
                                                onChange={(e) => {
                                                    const newUsers = [...users];
                                                    newUsers[index] = { ...user, role: e.target.value };
                                                    setUsers(newUsers);
                                                }}
                                            >
                                                {roles.map((role) => (
                                                    <option key={role} value={role}>{role}</option>
                                                ))}
                                            </select>
                                        ) : user.role}
                                    </td>
                                    <td className="py-4 px-2 flex items-center justify-start h-20">
                                        {editingId === index ? (
                                            <>
                                                <button 
                                                    className={`flex items-center px-3 py-1 rounded-md mr-2 ${
                                                        isUserChanged(user, originalUser)
                                                        ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
                                                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                                    }`}
                                                    onClick={() => handleAction('save', index, user)}
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
                                            <>
                                                <button 
                                                    className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-900 transition-all duration-200 mr-2 group"
                                                    onClick={() => handleAction('edit', index)}
                                                >
                                                    <FaUserEdit 
                                                        className="text-green-500 group-hover:text-green-600 group-hover:scale-110 transition-all duration-200" 
                                                        size={18} 
                                                    />
                                                </button>
                                                <button 
                                                    className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-all duration-200 group"
                                                    onClick={() => handleAction('delete', index)}
                                                >
                                                    <FaRegTrashCan 
                                                        className="text-red-500 group-hover:text-red-600 group-hover:scale-110 transition-all duration-200" 
                                                        size={18} 
                                                    />
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
            {showAddUser && (
                <AddUser onClose={() => setShowAddUser(false)} onAddUser={handleAddUser} />
            )}
            <Modal />
        </>
    );
};

export default UserManagement;
