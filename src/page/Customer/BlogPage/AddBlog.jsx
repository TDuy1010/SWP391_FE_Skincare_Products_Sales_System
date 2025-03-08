import React, { useState } from "react";
import { Form, Input, Button, Modal, Upload } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";

const AddBlog = ({ visible, onAddBlog, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [descriptions, setDescriptions] = useState({ description_0: "" });
  const [extraFields, setExtraFields] = useState([]);

  const handleSubmit = async (values) => {
    if (values.title && values.author && values.images_0?.length > 0 && values.description_0) {
      try {
        setLoading(true);
        const descriptionsArray = [values.description_0, ...extraFields.map((_, index) => values[`description_${index + 1}`] || "")];
        const images = [values.images_0, ...extraFields.map((_, index) => values[`images_${index + 1}`] || [])].flat().map(file => URL.createObjectURL(file.originFileObj));
        const newBlog = {
          title: values.title,
          descriptions: descriptionsArray,
          author: values.author,
          images
        };
        onAddBlog(newBlog);
        form.resetFields();
        setExtraFields([]);
        setDescriptions({ description_0: "" });
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

  const addExtraField = () => {
    setExtraFields([...extraFields, { key: Date.now() }]);
    setDescriptions({ ...descriptions, [`description_${extraFields.length + 1}`]: "" });
  };

  const handleEditorChange = (content, field) => {
    setDescriptions({ ...descriptions, [field]: content });
    form.setFieldsValue({ [field]: content });
  };

  return (
    <Modal
      title="Add New Blog"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
        className="space-y-4"
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
          name="description_0"
          label="Description 1"
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
              value={descriptions.description_0}
              onEditorChange={(content) => handleEditorChange(content, "description_0")}
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
          name="images_0"
          label="Upload Images 1"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Please upload at least one image" }]}
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

        {extraFields.map((field, index) => (
          <div key={field.key}>
            <Form.Item
              name={`description_${index + 1}`}
              label={`Description ${index + 2}`}
            >
              <div className="rounded-md p-2">
                <Editor
                  apiKey="ytrevybtd39tq9vrjvg8k0wxog5pd59dbv7v9me7xwz43rkn"
                  value={descriptions[`description_${index + 1}`]}
                  onEditorChange={(content) => handleEditorChange(content, `description_${index + 1}`)}
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
            <PlusOutlined /> Add Description and Images
          </Button>
          <Button onClick={onClose} className="mr-2 h-10 px-8 text-base font-medium">
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
  );
};

export default AddBlog;
