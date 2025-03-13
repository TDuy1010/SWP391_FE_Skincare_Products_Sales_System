import React, { useState, useEffect } from "react";
import { Form, Input, Button, Modal, Upload } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { updateBlog } from "../../../service/blog/index";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditBlog = ({ visible, onCancel, onSuccess, blogData, showToast }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  // Cấu hình cho React Quill
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false
    }
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'color', 'background',
    'align',
    'link', 'image'
  ];

  useEffect(() => {
    if (blogData) {
      form.setFieldsValue({
        title: blogData.title,
        content: blogData.content,
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
      
      if (values.image?.[0]?.originFileObj) {
        formData.append("image", values.image[0].originFileObj);
      }

      const response = await updateBlog(blogData.id, formData);
      
      if (!response.error) {
        showToast("success", "Cập nhật blog thành công!");
        onSuccess(response.message);
        onCancel();
      } else {
        showToast("error", response.message);
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("error", "Không thể cập nhật blog");
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
      showToast("warning", "Nội dung quá dài, có thể gây lỗi khi lưu");
    }
    setContent(value);
  };

  return (
    <Modal
      title="Chỉnh sửa Blog"
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
          label="Tiêu đề Blog"
          rules={[
            { required: true, message: "Vui lòng nhập tiêu đề blog" },
            { min: 3, message: "Tiêu đề phải có ít nhất 3 ký tự" },
          ]}
        >
          <Input placeholder="Nhập tiêu đề blog" className="h-10 text-base" />
        </Form.Item>

        <Form.Item
          label="Nội dung"
          name="content"
          rules={[
            { required: true, message: "Vui lòng nhập nội dung" },
            {
              validator: (_, value) => {
                const textContent = value ? value.replace(/<[^>]*>/g, "").trim() : "";
                return textContent.length >= 10
                  ? Promise.resolve()
                  : Promise.reject(new Error("Nội dung phải có ít nhất 10 ký tự"));
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
            style={{ height: '300px', marginBottom: '50px' }}
          />
        </Form.Item>

        <Form.Item
          name="image"
          label="Hình ảnh"
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
              <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item className="flex justify-end mb-0">
          <Button onClick={onCancel} className="mr-2">
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Cập nhật Blog
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditBlog;
