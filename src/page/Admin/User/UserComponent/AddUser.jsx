import { Modal, Form, Input, Select, Button, message } from 'antd';
import { useState } from 'react';

const AddUser = ({ onClose, onAddUser }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // Giả lập kiểm tra username và email trùng lặp
      if (values.username === "admin") {
        message.error("Username đã tồn tại!");
        setLoading(false);
        return;
      }

      if (values.email === "adminadmin@gmail.com") {
        message.error("Email đã được sử dụng!");
        setLoading(false);
        return;
      }

      // Thêm điểm mặc định và tạo đối tượng người dùng mới
      const newUser = {
        ...values,
        points: 0 // Điểm mặc định cho người dùng mới
      };

      // Delay giả lập API call
      setTimeout(() => {
        onAddUser(newUser);
        message.success("Thêm người dùng thành công!");
        form.resetFields();
        setLoading(false);
        onClose();
      }, 1000);

    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title="Thêm người dùng mới"
      open={true}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
          Thêm
        </Button>,
      ]}
      width={500}
    >
      <Form
        form={form}
        layout="vertical"
        name="addUserForm"
        className="mt-4"
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Vui lòng nhập username!' }]}
        >
          <Input placeholder="Nhập username" className="rounded-md" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password placeholder="Nhập mật khẩu" className="rounded-md" />
        </Form.Item>

        <Form.Item
          name="fullname"
          label="Họ và tên"
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
        >
          <Input placeholder="Nhập họ và tên" className="rounded-md" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' }
          ]}
        >
          <Input placeholder="Nhập email" className="rounded-md" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
        >
          <Input placeholder="Nhập số điện thoại" className="rounded-md" />
        </Form.Item>

        <Form.Item
          name="address"
          label="Địa chỉ"
        >
          <Input placeholder="Nhập địa chỉ" className="rounded-md" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Vai trò"
          rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
        >
          <Select placeholder="Chọn vai trò">
            <Select.Option value="Admin">Admin</Select.Option>
            <Select.Option value="Staff">Staff</Select.Option>
            <Select.Option value="User">User</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUser;