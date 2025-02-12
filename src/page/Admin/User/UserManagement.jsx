import { useState } from 'react'
import { FaUserEdit } from 'react-icons/fa';
import { FaRegTrashCan } from 'react-icons/fa6';

const UserManagement = () => {

    const [users, setUsers] = useState([
        { username: 'taile03', fullname: 'Le Thanh Tai', email: 'taile03@gmail.com', phone: '0909 113 114', address: 'Thu Duc', points: 50, role: 'Admin' },
        { username: 'phamhieu', fullname: 'Pham Van Tuan Hieu', email: 'phamhieu@gmail.com', phone: '0989 889 889', address: 'Long An', points: 50, role: 'Admin' }
      ]);
    
    const roles = ['Admin', 'User', 'Staff'];

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
                        <button className="bg-purple-600 text-white p-2 rounded-lg">+ Add User</button>
                    </div>
                    <table className="w-full text-left">
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
                                    <td className="py-4 px-2">{user.fullname}</td>
                                    <td className="py-4 px-2">{user.email}</td>
                                    <td className="py-4 px-2">{user.phone}</td>
                                    <td className="py-4 px-2">{user.address}</td>
                                    <td className="py-4 px-2">{user.points}</td>
                                    <td className="py-4 px-2">{user.role}</td>
                                    <td className="py-4 px-2 flex justify-around">
                                        <FaUserEdit className="text-green-500" size={20} />
                                        <FaRegTrashCan className='text-red-500' size={20} />
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

export default UserManagement
