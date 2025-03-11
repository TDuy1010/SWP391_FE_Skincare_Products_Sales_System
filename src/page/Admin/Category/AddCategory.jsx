import React, { useState } from "react";
import { Form, Input, Button, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { addCategory } from "../../../service/category/index";
import { toast, ToastContainer } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import { div } from "framer-motion/client";

const AddCategory = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

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

        const response = await addCategory(formData);
        if (!response.error) {
          onSuccess(response.message);
          form.resetFields();
          onCancel();
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to add category");
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
    <div>
      <ToastContainer/>
      <Modal
      title="Add New Category"
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
          label="Category Name"
          rules={[
            { required: true, message: "Please enter category name" },
            { min: 3, message: "Name must be at least 3 characters" },
          ]}
        >
          <Input
            placeholder="Enter category name"
            className="h-10 text-base"
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-gray-700 font-medium">Description</span>}
          name="description"
          rules={[
            { required: true, message: "Please enter description" },
            {
              validator: (_, value) => {
                const textContent = value ? value.replace(/<[^>]*>/g, "").trim() : "";
                return textContent.length >= 10
                  ? Promise.resolve()
                  : Promise.reject(new Error("Description must be at least 10 characters"));
              },
            },
          ]}
        >
          <div className="rounded-md p-2">
            <Editor
              apiKey="ytrevybtd39tq9vrjvg8k0wxog5pd59dbv7v9me7xwz43rkn"
              value={description}
              onEditorChange={(content) => {
                setDescription(content);
                form.setFieldsValue({ description: content }); 
                form.validateFields(["description"]); 
              }}
              init={{
                height: 250,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help",
                content_style: "body { font-family: Arial, sans-serif; font-size: 14px; }",
              }}
              className="w-full"
            />
          </div>
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

        <Form.Item className="flex justify-end mb-0">
          <Button onClick={onCancel} className="mr-2 h-10 px-8 text-base font-medium">
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="h-10 px-8 text-base font-medium"
          >
            Add Category
          </Button>
        </Form.Item>
      </Form>
    </Modal>
    </div>
  );
};

export default AddCategory;
