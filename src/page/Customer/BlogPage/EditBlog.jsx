import React, { useState } from "react";
import { Form, Input, Button, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";

const EditBlog = ({ visible, blog, onEditBlog, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(blog.description);

  const handleSubmit = async (values) => {
    if (values.title && values.description && values.author && values.image?.length > 0) {
      try {
        setLoading(true);
        const strippedDescription = values.description.replace(/<\/?p>/g, ""); // Remove <p> tags
        const updatedBlog = {
          ...blog,
          title: values.title,
          description: strippedDescription,
          author: values.author,
          image: values.image[0] ? URL.createObjectURL(values.image[0].originFileObj) : blog.image
        };
        onEditBlog(updatedBlog);
        form.resetFields();
        onClose();
      } catch (error) {
        console.error("Error:", error);
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
      title="Edit Blog"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      closeIcon={
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
        className="space-y-4"
        initialValues={{
          title: blog.title,
          description: blog.description,
          author: blog.author,
          image: blog.image ? [blog.image] : []
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            { required: true, message: "Please enter title" },
            { min: 3, message: "Title must be at least 3 characters" },
          ]}
        >
          <Input
            placeholder="Enter title"
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
          name="author"
          label="Author"
          rules={[
            { required: true, message: "Please enter author" },
            { min: 3, message: "Author must be at least 3 characters" },
          ]}
        >
          <Input
            placeholder="Enter author"
            className="h-10 text-base"
          />
        </Form.Item>

        <Form.Item
          name="image"
          label="Upload Image"
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
          <Button onClick={onClose} className="mr-2 h-10 px-8 text-base font-medium">
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="h-10 px-8 text-base font-medium"
          >
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditBlog;
