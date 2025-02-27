import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Card,
  message,
  Upload,
  Select,
  Modal,
} from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { addProduct } from "../../../service/product/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllCategories } from "../../../service/category/index";

const AddProduct = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getAllCategories();
      if (!response.error) {
        const activeCategories =
          response.result?.categoryResponses.filter(
            (category) => category.status === "ACTIVE"
          ) || [];
        setCategories(activeCategories);
      } else {
        toast.error("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFinish = async (values) => {
    if (
      values.name &&
      values.price &&
      values.description &&
      values.thumbnail?.length > 0 &&
      values.categoryId
    ) {
      try {
        setLoading(true);
        const formData = new FormData();

        // Get file from upload component
        const file = values.thumbnail[0].originFileObj;

        if (!file) {
          message.error("Please select a file");
          return;
        }

        formData.append(
          "request",
          JSON.stringify({
            name: values.name,
            price: values.price,
            description: values.description,
            category_id: values.categoryId,
          })
        );
        formData.append("thumbnail", file);

        const response = await addProduct(formData);
        if (!response.error) {
          onSuccess(response.message);
          form.resetFields();
          onCancel();
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Failed to add product");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
      title="Add New Product"
    >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        className="space-y-6"
      >
        <Form.Item
          name="name"
          label="Product Name"
          rules={[
            { required: true, message: "Please enter product name" },
            { min: 3, message: "Name must be at least 3 characters" },
          ]}
        >
          <Input
            placeholder="Enter product name"
            className="rounded-md h-12"
          />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
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
            className="w-full rounded-md h-12"
            min={0.01}
            step={0.01}
            placeholder="Enter price"
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
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

        <Form.Item
          name="categoryId"
          label="Category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select
            placeholder="Select a category"
            options={categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
            className="w-full rounded-md h-12"
          />
        </Form.Item>

        <Form.Item
          name="thumbnail"
          label="Thumbnail"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload
            beforeUpload={() => false}
            maxCount={1}
            accept="image/*"
            listType="picture"
            className="upload-list-inline"
          >
            <Button icon={<UploadOutlined />} className="rounded-md h-12">
              Select Image
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item className="mt-6">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full md:w-auto px-8 h-12 rounded-md bg-blue-600 hover:bg-blue-700"
          >
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddProduct;
