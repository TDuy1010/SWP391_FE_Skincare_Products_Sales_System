import React, { useState, useEffect } from "react";
import { Form, Input, Button, Modal, Upload } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { updateBlog } from "../../../service/blogService/index";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditBlog = ({ visible, onCancel, onSuccess, blogData, showToast }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  // React Quill configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "color",
    "background",
    "align",
    "link",
    "image",
  ];

  useEffect(() => {
    if (blogData) {
      form.setFieldsValue({
        title: blogData.title,
        content: blogData.content,
        image: blogData.image ? [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: blogData.image,
          }
        ] : []
      });
      setContent(blogData.content || "");
    }
  }, [blogData, form]);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", content);
      formData.append("currentImage", blogData.image || "");

      if (values.image?.[0]?.originFileObj) {
        formData.append("image", values.image[0].originFileObj);
      }

      const response = await updateBlog(blogData.id, formData);

      if (!response.error) {
        showToast("success", "Blog updated successfully!");
        onSuccess(response.message);
        onCancel();
      } else {
        showToast("error", response.message);
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("error", "Unable to update blog");
    } finally {
      setLoading(false);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleContentChange = (value) => {
    if (value.length > 1000000) {
      showToast("warning", "Content is too long, may cause errors when saving");
    }
    setContent(value);
  };

  return (
    <Modal
      title="Edit Blog"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={1000}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        className="space-y-4"
      >
        <Form.Item
          name="title"
          label="Blog Title"
          rules={[
            { required: true, message: "Please enter a blog title" },
            { min: 3, message: "Title must be at least 3 characters long" },
          ]}
        >
          <Input placeholder="Enter blog title" className="h-10 text-base" />
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[
            { required: true, message: "Please enter content" },
            {
              validator: (_, value) => {
                const textContent = value
                  ? value.replace(/<[^>]*>/g, "").trim()
                  : "";
                return textContent.length >= 10
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("Content must be at least 10 characters long")
                    );
              },
            },
          ]}
        >
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleContentChange}
            modules={modules}
            formats={formats}
            style={{ height: "300px", marginBottom: "50px" }}
          />
        </Form.Item>

        <Form.Item
          name="image"
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            beforeUpload={() => false}
            maxCount={1}
            accept="image/*"
            listType="picture-card"
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item className="flex justify-end mb-0">
          <Button onClick={onCancel} className="mr-2">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Blog
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditBlog;