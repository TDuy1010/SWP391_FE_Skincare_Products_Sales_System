import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Card,
  Select,
  Spin,
  Upload,
} from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../../service/product/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await getProductById(id);
      if (!response.error) {
        form.setFieldsValue({
          name: response.result.name,
          price: response.result.price,
          description: response.result.description,
          status: response.result.status,
        });
        setImageUrl(response.result.thumbnail);
        setFileList([
          {
            uid: "-1",
            name: "thumbnail.png",
            status: "done",
            url: response.result.thumbnail,
          },
        ]);
      } else {
        toast.error(response.message, {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/admin/product");
      }
    } catch (error) {
      toast.error("Failed to fetch product details", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/admin/product");
    } finally {
      setInitialLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();

      const requestData = {
        name: values.name,
        price: values.price,
        description: values.description,
        status: values.status,
      };

      formData.append("request", JSON.stringify(requestData));

      if (fileList[0]?.originFileObj) {
        formData.append("thumbnail", fileList[0].originFileObj);
      } else {
        requestData.thumbnail = imageUrl;
      }

      const response = await updateProduct(id, formData);

      if (!response.error) {
        navigate("/admin/product");
        toast.success("Product updated successfully!", {
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
      toast.error("Failed to update product", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        toast.error("You can only upload image files!");
        return false;
      }
      return false;
    },
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList);
    },
    fileList,
    maxCount: 1,
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
          onClick={() => navigate("/admin/product")}
          className="mb-4 hover:bg-gray-100 transition-colors"
        >
          Back to Products
        </Button>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <Card className="shadow-md rounded-lg">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-800">Edit Product</h1>
          </div>

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
                  label={
                    <span className="text-gray-700 font-medium">
                      Product Name
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please enter product name" },
                    { min: 3, message: "Name must be at least 3 characters" },
                  ]}
                >
                  <Input
                    placeholder="Enter product name"
                    className="rounded-md"
                  />
                </Form.Item>

                <Form.Item
                  name="price"
                  label={
                    <span className="text-gray-700 font-medium">Price</span>
                  }
                  rules={[
                    { required: true, message: "Please enter price" },
                    {
                      type: "number",
                      min: 0.01,
                      message: "Price must be greater than 0",
                    },
                  ]}
                >
                  <InputNumber
                    className="w-full rounded-md"
                    min={0.01}
                    step={0.01}
                    placeholder="Enter product price"
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  />
                </Form.Item>

                <Form.Item
                  name="status"
                  label={
                    <span className="text-gray-700 font-medium">Status</span>
                  }
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
                  label={
                    <span className="text-gray-700 font-medium">
                      Description
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please enter description" },
                    {
                      min: 10,
                      message: "Description must be at least 10 characters",
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Enter product description"
                    maxLength={500}
                    showCount
                    className="rounded-md"
                  />
                </Form.Item>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="mb-6">
                <h3 className="text-gray-700 font-medium mb-4">Product Image</h3>
                {imageUrl && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Current Image:</p>
                    <img
                      src={imageUrl}
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
                getValueFromEvent={(e) => {
                  if (Array.isArray(e)) {
                    return e;
                  }
                  return e?.fileList;
                }}
              >
                <Upload {...uploadProps} listType="picture" className="upload-list-inline">
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
                onClick={() => navigate("/admin/product")}
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
                Update Product
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default EditProduct;
