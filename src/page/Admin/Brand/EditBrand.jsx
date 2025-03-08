import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Select, Spin, Upload, Modal } from "antd";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { getBrandById, updateBrand } from "../../../service/brand/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";

const EditBrand = ({ visible, onCancel, onSuccess }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [fileList, setFileList] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchBrandDetails();
  }, [id]);

  const fetchBrandDetails = async () => {
    try {
      const response = await getBrandById(id);
      if (!response.error) {
        form.setFieldsValue({
          name: response.result.name,
          description: response.result.description,
          
        });
        setImageUrl(response.result.thumbnail);
        setFileList([
          {
            uid: "-1",
            name: "thumbnail.png",
            
            url: response.result.thumbnail,
          },
        ]);
      } else {
        toast.error(response.message, {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/admin/brand");
      }
    } catch (error) {
      toast.error("Failed to fetch brand details", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/admin/brand");
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
        description: values.description,
      };

      formData.append("request", JSON.stringify(requestData));

      if (fileList[0]?.originFileObj) {
        formData.append("thumbnail", fileList[0].originFileObj);
      } else {
        requestData.thumbnail = imageUrl;
      }

      const response = await updateBrand(id, formData);

      if (!response.error) {
        navigate("/admin/brand");
        toast.success("Brand updated successfully!", {
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
      toast.error("Failed to update brand", {
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
                  label={
                    <span className="text-gray-700 font-medium">
                      Brand Name
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please enter brand name" },
                    { min: 3, message: "Name must be at least 3 characters" },
                  ]}
                >
                  <Input
                    placeholder="Enter brand name"
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
            
            <div className="pt-2 mt-6">
              <div className="mb-6">
                <h3 className="text-gray-700 font-medium mb-4">Brand Image</h3>
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

            <Form.Item className="mb-0">
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
                Update Brand
              </Button>
            </div>
            </Form.Item>
          </Form>
  </Modal>
    </div>
  );
};

export default EditBrand;
