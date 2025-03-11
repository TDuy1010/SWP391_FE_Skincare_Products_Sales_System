import React, { useState } from "react";
import { Form, Input, Button, Modal, Upload, message } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { addBlog } from "../../../service/blog/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";

const AddBlog = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [contents, setContents] = useState({ content_0: "" });
  const [extraFields, setExtraFields] = useState([]);

  const onFinish = async (values) => {
    if (values.title && values.content_0 && values.author && values.thumbnail?.length > 0) {
      try {
        setLoading(true);
        const formData = new FormData();

        const file = values.thumbnail[0].originFileObj;

        if (!file) {
          toast.error("Please select a file");
          return;
        }

        const contentsArray = [values.content_0, ...extraFields.map((_, index) => values[`content_${index + 1}`] || "")];

        formData.append(
          "request",
          JSON.stringify({ title: values.title, contents: contentsArray, author: values.author })
        );
        formData.append("thumbnail", file);

        const response = await addBlog(formData);
        if (!response.error) {
          form.resetFields();
          onSuccess(response.message);
          onCancel();
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to add blog");
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

  const addExtraField = () => {
    setExtraFields([...extraFields, { key: Date.now() }]);
    setContents({ ...contents, [`content_${extraFields.length + 1}`]: "" });
  };

  const handleEditorChange = (content, field) => {
    setContents({ ...contents, [field]: content });
    form.setFieldsValue({ [field]: content });
  };

  return (
    <div>
      <ToastContainer />
      <Modal
        title="Add New Blog"
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
            name="title"
            label="Blog Title"
            rules={[
              { required: true, message: "Please enter blog title" },
              { min: 3, message: "Title must be at least 3 characters" },
            ]}
          >
            <Input placeholder="Enter blog title" className="h-10 text-base" />
          </Form.Item>

          <Form.Item
            name="author"
            label="Author"
            rules={[
              { required: true, message: "Please enter author" },
              { min: 3, message: "Author must be at least 3 characters" },
            ]}
          >
            <Input placeholder="Enter author" className="h-10 text-base" />
          </Form.Item>

          <Form.Item
            label={<span className="text-gray-700 font-medium">Content</span>}
            name="content_0"
            rules={[
              { required: true, message: "Please enter content" },
              {
                validator: (_, value) => {
                  const textContent = value ? value.replace(/<[^>]*>/g, "").trim() : "";
                  return textContent.length >= 10
                    ? Promise.resolve()
                    : Promise.reject(new Error("Content must be at least 10 characters"));
                },
              },
            ]}
          >
            <div className="rounded-md p-2">
              <Editor
                apiKey="ytrevybtd39tq9vrjvg8k0wxog5pd59dbv7v9me7xwz43rkn"
                value={contents.content_0}
                onEditorChange={(content) => handleEditorChange(content, "content_0")}
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

          {extraFields.map((field, index) => (
            <div key={field.key}>
              <Form.Item
                name={`content_${index + 1}`}
                label={`Content ${index + 2}`}
              >
                <div className="rounded-md p-2">
                  <Editor
                    apiKey="ytrevybtd39tq9vrjvg8k0wxog5pd59dbv7v9me7xwz43rkn"
                    value={contents[`content_${index + 1}`]}
                    onEditorChange={(content) => handleEditorChange(content, `content_${index + 1}`)}
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
                name={`images_${index + 1}`}
                label={`Upload Images ${index + 2}`}
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload
                  beforeUpload={() => false}
                  multiple
                  accept="image/*"
                  listType="picture"
                >
                  <Button icon={<UploadOutlined />}>Select Images</Button>
                </Upload>
              </Form.Item>
            </div>
          ))}

          <Form.Item className="flex justify-end mb-0">
            <Button
              type="dashed"
              onClick={addExtraField}
              className="mr-2 h-10 px-8 text-base font-medium"
            >
              <PlusOutlined /> Add Content and Images
            </Button>
            <Button onClick={onCancel} className="mr-2 h-10 px-8 text-base font-medium">
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="h-10 px-8 text-base font-medium"
            >
              Add Blog
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddBlog;
