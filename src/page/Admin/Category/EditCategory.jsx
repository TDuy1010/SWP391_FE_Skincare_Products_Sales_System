import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Select, Spin, Upload, Modal } from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCategoryById,
  updateCategory,
  uploadToCloudinary,
} from "../../../service/category/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";

const EditCategory = ({ visible, onCancel, onSuccess }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [currentThumbnail, setCurrentThumbnail] = useState("");
  const [description, setDescription] = useState("");

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
    <div>
      <ToastContainer />
      <Modal
      title="Edit Brand"
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
                  label={<span className="text-gray-700 font-medium">Description</span>}
                  name="description"
                  rules={[
                    { required: true, message: "Please enter description" },
                    { min: 10, message: "Description must be at least 10 characters" },
                  ]}
                >
                  
                    <Editor
                      apiKey='ytrevybtd39tq9vrjvg8k0wxog5pd59dbv7v9me7xwz43rkn'
                      value={description}
                      onEditorChange={(content) => {
                        setDescription(content);
                        form.setFieldsValue({ description: content }); 
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
                  
                </Form.Item>
              
            

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
                rules={[{ required: true, message: "Please upload an image" }]}
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

            <div className="flex justify-end">
              <Button 
                onClick={onCancel}
                className="mr-2 h-10 px-8 text-base font-medium"
              >
                Cancel
              </Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                className="h-10 px-8 text-base font-medium rounded-md px-8 bg-blue-600 hover:bg-blue-700"
              >
                Update Category
              </Button>
            </div>
          </Form>
      </Modal>
     
    </div>
  );
};

export default EditCategory;
