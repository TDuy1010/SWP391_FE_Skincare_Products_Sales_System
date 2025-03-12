import { useState } from 'react';
import { Button, Space, Table, Tag, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import EditUser from './EditUser';

const TableUser = ({ users, loading, pagination, onTableChange, onDelete, onEdit }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone) => phone || 'Chưa cung cấp'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      render: (address) => address || 'Chưa cung cấp'
    },
    {
      title: 'Điểm',
      dataIndex: 'points',
      key: 'points',
      render: (points) => points || 0
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'Admin' ? 'red' : (role === 'Staff' ? 'blue' : 'green')}>
          {role}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record, index) => (
        <Space size="middle">
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record, index)}
          >
            Sửa
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(index)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record, index) => {
    setSelectedUser({...record, index});
    setIsEditModalOpen(true);
  };

  const showDeleteConfirm = (index) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa người dùng này?',
      icon: <ExclamationCircleOutlined />,
      content: 'Hành động này không thể hoàn tác.',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        onDelete(index);
      },
    });
  };

  const handleEditSubmit = (values) => {
    onEdit(values, values.index);
    setIsEditModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <Table 
        columns={columns} 
        dataSource={users}
        rowKey={(record, index) => index.toString()}
        loading={loading}
        pagination={pagination ? {
          current: pagination.current || 1,
          pageSize: pagination.pageSize || 10,
          total: pagination.total || 0,
          onChange: (page, pageSize) => onTableChange && onTableChange(page, pageSize),
          showSizeChanger: true,
          showQuickJumper: true,
        } : false}
      />

      <EditUser
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={handleEditSubmit}
        userData={selectedUser}
      />
    </div>
  );
};

export default TableUser;