import { useState, useEffect } from 'react';
import { Button, Input, Select, message } from 'antd';
import { UserAddOutlined, SearchOutlined } from '@ant-design/icons';
import TableUser from './UserComponent/TableUser';
import AddUser from './UserComponent/AddUser';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { username: 'taile03', fullname: 'Le Thanh Tai', email: 'taile03@gmail.com', phone: '0909 113 114', address: 'Thu Duc', points: 50, role: 'Admin' },
    { username: 'phamhieu', fullname: 'Pham Van Tuan Hieu', email: 'phamhieu@gmail.com', phone: '0989 889 889', address: 'Long An', points: 50, role: 'Admin' }
  ]);
  
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  
  const roles = ['All', 'Admin', 'Staff', 'User'];

  useEffect(() => {
    filterUsers();
  }, [searchText, selectedRole, users]);

  const filterUsers = () => {
    let result = [...users];
    
    // Filter by search text
    if (searchText) {
      result = result.filter(user => 
        user.username.toLowerCase().includes(searchText.toLowerCase()) ||
        user.fullname.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    // Filter by role
    if (selectedRole !== 'All') {
      result = result.filter(user => user.role === selectedRole);
    }
    
    setFilteredUsers(result);
  };

  const handleEdit = (userData, index) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedUsers = [...users];
      updatedUsers[index] = userData;
      setUsers(updatedUsers);
      setLoading(false);
      message.success('Cập nhật người dùng thành công!');
    }, 500);
  };

  const handleDelete = (index) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedUsers = users.filter((_, i) => i !== index);
      setUsers(updatedUsers);
      setLoading(false);
      message.success('Xóa người dùng thành công!');
    }, 500);
  };

  const handleAddUser = (newUser) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setUsers([...users, newUser]);
      setLoading(false);
    }, 500);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quản lý người dùng</h2>
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <Input
              placeholder="Tìm kiếm người dùng"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 250 }}
            />
            <Select
              value={selectedRole}
              onChange={setSelectedRole}
              style={{ width: 150 }}
            >
              {roles.map((role) => (
                <Select.Option key={role} value={role}>
                  {role}
                </Select.Option>
              ))}
            </Select>
          </div>
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => setShowAddUser(true)}
          >
            Thêm người dùng
          </Button>
        </div>

        <TableUser 
          users={filteredUsers}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      
      {showAddUser && (
        <AddUser 
          onClose={() => setShowAddUser(false)} 
          onAddUser={handleAddUser} 
        />
      )}
    </div>
  );
};

export default UserManagement;