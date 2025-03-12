import { useEffect } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';

const EditUser = ({ isOpen, onClose, onSubmit, userData }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        index: userData.index,
        username: userData.username,
        fullname: userData.fullname,
        email: userData.email,
        phone: userData.phone,
        address: userData.address || '',
        points: userData.points,
        role: userData.role,
      });
    }
  }, [userData, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={<h3 className="text-lg font-semibold">Chỉnh sửa người dùng</h3>}
      open={isOpen}
      onCancel={onClose}
      className="min-w-[500px]"
      footer={[
        <Button
          key="back"
          onClick={onClose}
          className="min-w-[100px] bg-gray-100 hover:bg-gray-200"
        >
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          className="min-w-[100px]"
        >
          Cập nhật
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="editUserForm"
        className="mt-4"
      >
        <Form.Item name="index" hidden>
          <Input />
        </Form.Item>
        
        <Form.Item
          name="username"
          label="Username"
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="fullname"
          label="Họ và tên"
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
        >
          <Input
            placeholder="Nhập họ và tên"
            className="rounded-md"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' }
          ]}
        >
          <Input
            placeholder="Nhập email"
            className="rounded-md"
          />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
        >
          <Input
            placeholder="Nhập số điện thoại"
            className="rounded-md"
          />
        </Form.Item>

        <Form.Item
          name="address"
          label="Địa chỉ"
        >
          <Input
            placeholder="Nhập địa chỉ"
            className="rounded-md"
          />
        </Form.Item>

        <Form.Item
          name="points"
          label="Điểm"
        >
          <Input
            type="number"
            placeholder="Nhập số điểm"
            className="rounded-md"
          />
        </Form.Item>

        <Form.Item
          name="role"
          label="Vai trò"
          rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
        >
          <Select 
            placeholder="Chọn vai trò"
            className="rounded-md"
          >
            <Select.Option value="Admin">Admin</Select.Option>
            <Select.Option value="Staff">Staff</Select.Option>
            <Select.Option value="User">User</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUser;