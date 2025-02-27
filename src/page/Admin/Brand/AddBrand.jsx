import React, { useState } from "react";
import { Form, Input, Button, Modal, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { addBrand } from "../../../service/brand/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBrand = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    if (values.name && values.description && values.thumbnail?.length > 0) {
      try {
        setLoading(true);
        const formData = new FormData();

        const file = values.thumbnail[0].originFileObj;

        if (!file) {
          toast.error("Please select a file");
          return;
        }

        formData.append(
          "request",
          JSON.stringify({ name: values.name, description: values.description })
        );
        formData.append("thumbnail", file);

        const response = await addBrand(formData);
        if (!response.error) {
          form.resetFields();
          onSuccess(response.message);
          onCancel();
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to add brand");
      } finally {
        setLoading(false);
      }
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Modal
      title="Add New Brand"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        className="space-y-4"
      >
        <Form.Item
          name="name"
          label="Brand Name"
          rules={[
            { required: true, message: "Please enter brand name" },
            { min: 3, message: "Name must be at least 3 characters" },
          ]}
        >
          <Input placeholder="Enter brand name" className="h-10 text-base" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please enter description" },
            { min: 10, message: "Description must be at least 10 characters" },
          ]}
        >
          <Input.TextArea
            rows={6}
            placeholder="Enter brand description"
            maxLength={500}
            showCount
            className="text-base"
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
          >
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item className="mb-0">
          <div className="flex justify-end gap-2">
            <Button onClick={onCancel}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="h-10 px-8 text-base font-medium"
            >
              Add Brand
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBrand;
