import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Upload,
  Card,
  Row,
  Col,
  Divider,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  UploadOutlined,
  UserOutlined,
  KeyOutlined,
  CalendarOutlined,
  IdcardOutlined,
  ArrowLeftOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { addUser, uploadToCloudinary } from "../../../service/userManagement";
import { ToastContainer, toast } from "react-toastify";

const AddUser = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState(null);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      let avatarUrl = null;
      if (values.avatar?.length > 0) {
        const file = values.avatar[0].originFileObj;
        try {
          avatarUrl = await uploadToCloudinary(file);
        } catch (error) {
          toast.error("Failed to upload image");
          setLoading(false);
          return;
        }
      }

      const formData = {
        ...values,
        birthday: values.birthday ? values.birthday.format("YYYY-MM-DD") : null,
        avatar: avatarUrl,
        phone: values.phone || "", // Added phone field
      };

      const response = await addUser(formData);
      if (response && response.code === 201) {
        toast.success(response.message);
        navigate("/admin/user");
      } else {
        toast.error(response.message || "Failed to add user");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = ({ fileList }) => {
    const file = fileList[0]?.originFileObj;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(null);
    }
    return fileList;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-4 max-w-4xl mx-auto">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/admin/user")}
          className="mb-4 hover:bg-gray-100"
        >
          Back to Users
        </Button>
      </div>

      <Card
        className="max-w-4xl mx-auto shadow-md hover:shadow-lg transition-shadow duration-300"
        title={
          <div className="flex items-center space-x-2">
            <UserOutlined className="text-blue-500" />
            <span className="text-2xl font-bold">Add New User</span>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="mt-4"
        >
          <Row gutter={24}>
            <Col xs={24} md={8} className="text-center mb-6">
              <div className="mb-4">
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center bg-gray-50">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserOutlined
                      style={{ fontSize: "64px", color: "#d9d9d9" }}
                    />
                  )}
                </div>
              </div>
              <Form.Item
                name="avatar"
                valuePropName="fileList"
                getValueFromEvent={handleAvatarChange}
              >
                <Upload
                  name="avatar"
                  listType="picture"
                  maxCount={1}
                  beforeUpload={() => false}
                  accept="image/*"
                  showUploadList={false}
                >
                  <Button
                    icon={<UploadOutlined />}
                    type="primary"
                    className="hover:opacity-90"
                  >
                    Upload Avatar
                  </Button>
                </Upload>
              </Form.Item>

              <div className="mt-4 text-sm text-gray-500">
                <p>Avatar is optional but recommended</p>
                <p>Max file size: 5MB</p>
              </div>
            </Col>

            <Col xs={24} md={16}>
              <Divider orientation="left">Personal Information</Divider>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[
                      { required: true, message: "Please enter first name!" },
                    ]}
                  >
                    <Input
                      prefix={<IdcardOutlined />}
                      placeholder="First name"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[
                      { required: true, message: "Please enter last name!" },
                    ]}
                  >
                    <Input
                      prefix={<IdcardOutlined />}
                      placeholder="Last name"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="birthday"
                    label="Birthday"
                    rules={[
                      { required: true, message: "Please select birthday!" },
                    ]}
                  >
                    <DatePicker
                      format="YYYY-MM-DD"
                      className="w-full"
                      suffixIcon={<CalendarOutlined />}
                      placeholder="Select date of birth"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[
                      { required: true, message: "Please select gender!" },
                    ]}
                  >
                    <Select placeholder="Select gender">
                      <Select.Option value="MALE">Male</Select.Option>
                      <Select.Option value="FEMALE">Female</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Divider orientation="left">Account Details</Divider>

              <Form.Item
                name="username"
                label="Username"
                rules={[
                  { required: true, message: "Please input username!" },
                  { min: 4, message: "Username must be at least 4 characters" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Enter username" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input password!" },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<KeyOutlined />}
                  placeholder="Enter password"
                />
              </Form.Item>

              <Form.Item
                name="roleName"
                label="Role"
                rules={[{ required: true, message: "Please select role!" }]}
              >
                <Select placeholder="Select user role">
                  <Select.Option value="CUSTOMER">Customer</Select.Option>
                  <Select.Option value="DELIVERY">Delivery</Select.Option>
                  <Select.Option value="STAFF">Staff</Select.Option>
                  <Select.Option value="MANAGER">Manager</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <div className="flex justify-end mt-6">
            <Button
              className="mr-4 hover:bg-gray-100"
              onClick={() => navigate("/admin/user")}
              size="large"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              className="min-w-[120px] hover:opacity-90"
            >
              Create User
            </Button>
          </div>
        </Form>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default AddUser;
