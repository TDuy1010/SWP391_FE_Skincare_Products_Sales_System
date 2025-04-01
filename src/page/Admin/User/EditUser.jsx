import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, DatePicker, Upload, Card, Row, Col, Divider, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { 
  UploadOutlined, 
  UserOutlined, 
  KeyOutlined, 
  CalendarOutlined, 
  IdcardOutlined, 
  ArrowLeftOutlined,
  PhoneOutlined  
} from "@ant-design/icons";
import {
  editUser,
  uploadToCloudinary,
  getUserById,
} from "../../../service/userManagement";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";

const EditUser = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setFetchingData(true);
        const response = await getUserById(id);
        if (response && response.code === 200) {
          const userData = response.result;
          setInitialData(userData);
          setImageUrl(userData.avatar);
          setAvatarPreview(userData.avatar);

          form.setFieldsValue({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            gender: userData.gender || undefined,
            username: userData.username,
            roleName: userData.roleName,
            birthday: userData.birthday ? moment(userData.birthday) : undefined,
            phone: userData.phone || "",
            avatar: userData.avatar
              ? [
                  {
                    uid: "-1",
                    name: "avatar",
                    status: "done",
                    url: userData.avatar,
                  },
                ]
              : [],
          });
        } else {
          toast.error("Failed to fetch user data");
        }
      } catch (error) {
        toast.error("Error fetching user data");
      } finally {
        setFetchingData(false);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      let avatarUrl = imageUrl;

      if (values.avatar?.length > 0 && values.avatar[0].originFileObj) {
        const file = values.avatar[0].originFileObj;
        try {
          const cloudinaryUrl = await uploadToCloudinary(file);
          if (cloudinaryUrl) {
            avatarUrl = cloudinaryUrl;
          }
        } catch (error) {
          toast.error("Failed to upload image");
          setLoading(false);
          return;
        }
      }

      const formData = { ...initialData };
      formData.avatar = avatarUrl;
      formData.firstName = values.firstName;
      formData.lastName = values.lastName;
      formData.birthday = values.birthday?.format("YYYY-MM-DD");
      formData.gender = values.gender;
      if (values.password) formData.password = values.password;
      formData.phone = values.phone;
      formData.roleName = values.roleName;

      const response = await editUser(id, formData);
      if (response && response.code === 200) {
        toast.success(response.message);
        navigate("/admin/user");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
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
    } else if (fileList.length > 0 && fileList[0].url) {
      // If it's an existing image from the server
      setAvatarPreview(fileList[0].url);
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
          <span className="ml-1 text-base">Back to Users</span>
        </Button>
      </div>

      {fetchingData ? (
        <Card className="max-w-4xl mx-auto shadow-md text-center p-8">
          <Spin size="large" />
          <p className="mt-4 text-gray-500">Loading user data...</p>
        </Card>
      ) : (
        <Card 
          className="max-w-4xl mx-auto shadow-md hover:shadow-lg transition-shadow duration-300"
          title={
            <div className="flex items-center space-x-2">
              <UserOutlined className="text-blue-500" />
              <span className="text-2xl font-bold">Edit User</span>
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
                      <UserOutlined style={{ fontSize: '64px', color: '#d9d9d9' }} />
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
                    <Button icon={<UploadOutlined />} type="primary" className="hover:opacity-90">
                      Change Avatar
                    </Button>
                  </Upload>
                </Form.Item>

                <div className="mt-4 text-sm text-gray-500">
                  <p>User ID: {initialData?.id}</p>
                  <p>Created: {initialData?.createdDate ? moment(initialData.createdDate).format('DD/MM/YYYY') : 'N/A'}</p>
                </div>
              </Col>
              
              <Col xs={24} md={16}>
                <Divider orientation="left">Personal Information</Divider>
                
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="firstName"
                      label="First Name"
                      rules={[{ required: true, message: "Please enter first name!" }]}
                    >
                      <Input prefix={<IdcardOutlined />} placeholder="First name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="lastName"
                      label="Last Name"
                      rules={[{ required: true, message: "Please enter last name!" }]}
                    >
                      <Input prefix={<IdcardOutlined />} placeholder="Last name" />
                    </Form.Item>
                  </Col>
                </Row>
                
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="birthday"
                      label="Birthday"
                      rules={[{ required: true, message: "Please select birthday!" }]}
                    >
                      <DatePicker 
                        format="YYYY-MM-DD" 
                        className="w-full"
                        suffixIcon={<CalendarOutlined />}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="gender"
                      label="Gender"
                      rules={[{ required: true, message: "Please select gender!" }]}
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
                >
                  <Input 
                    prefix={<UserOutlined />} 
                    disabled 
                    className="bg-gray-50"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  extra="Leave blank to keep current password"
                  rules={[
                    { 
                      min: 6, 
                      message: "Password must be at least 6 characters!",
                      warningOnly: true
                    }
                  ]}
                >
                  <Input.Password 
                    prefix={<KeyOutlined />}
                    placeholder="Enter new password" 
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
                Update User
              </Button>
            </div>
          </Form>
        </Card>
      )}
      <ToastContainer />
    </div>
  );
};

export default EditUser;