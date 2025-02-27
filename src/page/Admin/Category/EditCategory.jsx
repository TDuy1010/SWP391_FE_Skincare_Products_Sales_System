import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Select, Spin, Upload } from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCategoryById,
  updateCategory,
  uploadToCloudinary,
} from "../../../service/category/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [currentThumbnail, setCurrentThumbnail] = useState("");

  useEffect(() => {
    fetchCategoryDetails();
  }, [id]);

  const fetchCategoryDetails = async () => {
    try {
      const response = await getCategoryById(id);
      if (!response.error) {
        form.setFieldsValue({
          name: response.result.name,
          description: response.result.description,
          status: response.result.status,
        });
        setCurrentThumbnail(response.result.thumbnail);
      } else {
        toast.error(response.message, {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/admin/category");
      }
    } catch (error) {
      toast.error("Failed to fetch category details", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/admin/category");
    } finally {
      setInitialLoading(false);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      let thumbnailUrl = currentThumbnail;

      // Nếu có file ảnh mới được upload
      if (values.thumbnail?.length > 0) {
        const file = values.thumbnail[0].originFileObj;
        const formData = new FormData();
        formData.append("file", file);
        thumbnailUrl = await uploadToCloudinary(file);
      }

      const updateData = {
        ...values,
        thumbnail: thumbnailUrl,
      };

      const response = await updateCategory(id, updateData);

      if (!response.error) {
        navigate("/admin/category");
        toast.success("Category updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error(response.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Failed to update category", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ToastContainer />
      
      <div className="flex items-center pl-8 justify-between">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/admin/category")}
            className="flex items-center hover:bg-gray-100 transition-colors"
          >
            Back to Categories
          </Button>
        </div>

      <div className="max-w-4xl mx-auto px-4">
        <Card 
          className="shadow-md rounded-lg"
          title={
            <span className="text-xl font-semibold text-gray-800">
              Edit Category
            </span>
          }
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Form.Item
                  name="name"
                  label={<span className="text-gray-700 font-medium">Category Name</span>}
                  rules={[
                    { required: true, message: "Please enter category name" },
                    { min: 3, message: "Name must be at least 3 characters" },
                  ]}
                >
                  <Input 
                    placeholder="Enter category name"
                    className="rounded-md"
                  />
                </Form.Item>

                <Form.Item
                  name="status"
                  label={<span className="text-gray-700 font-medium">Status</span>}
                  rules={[{ required: true, message: "Please select status" }]}
                >
                  <Select className="rounded-md">
                    <Select.Option value="ACTIVE">Active</Select.Option>
                    <Select.Option value="INACTIVE">Inactive</Select.Option>
                  </Select>
                </Form.Item>
              </div>

              <div>
                <Form.Item
                  name="description"
                  label={<span className="text-gray-700 font-medium">Description</span>}
                  rules={[
                    { required: true, message: "Please enter description" },
                    { min: 10, message: "Description must be at least 10 characters" },
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Enter category description"
                    maxLength={500}
                    showCount
                    className="rounded-md"
                  />
                </Form.Item>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="mb-6">
                <h3 className="text-gray-700 font-medium mb-4">Category Image</h3>
                {currentThumbnail && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Current Image:</p>
                    <img
                      src={currentThumbnail}
                      alt="Current thumbnail"
                      className="max-w-xs rounded-lg shadow-sm"
                      style={{ maxHeight: "200px" }}
                    />
                  </div>
                )}
              </div>

              <Form.Item
                name="thumbnail"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload
                  beforeUpload={() => false}
                  maxCount={1}
                  accept="image/*"
                  listType="picture"
                  className="upload-list-inline"
                >
                  <Button 
                    icon={<UploadOutlined />}
                    className="rounded-md hover:bg-gray-50 border-dashed"
                  >
                    Upload New Image
                  </Button>
                </Upload>
              </Form.Item>
            </div>

            <div className="flex justify-end space-x-4 border-t border-gray-200 pt-6 mt-6">
              <Button 
                onClick={() => navigate("/admin/category")}
                className="rounded-md px-6"
              >
                Cancel
              </Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                className="rounded-md px-8 bg-blue-600 hover:bg-blue-700"
              >
                Update Category
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default EditCategory;
