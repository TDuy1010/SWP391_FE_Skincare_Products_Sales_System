import React, { useState, useEffect, useRef } from "react";
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
import { getAllBrandsUser } from "../../../service/brand/index";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import CustomEditor from "./CustomEditor";

const AddProduct = ({ visible, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const categoryResponse = await getAllCategories();
      if (!categoryResponse.error) {
        const activeCategories =
          categoryResponse.result?.categoryResponses.filter(
            (category) => category.status === "ACTIVE"
          ) || [];
        setCategories(activeCategories);
      } else {
        toast.error("Failed to fetch categories");
      }

      const brandResponse = await getAllBrandsUser();
      if (!brandResponse.error) {
        const activeBrands =
          brandResponse.result?.brandResponses.filter(
            (brand) => brand.status === "ACTIVE"
          ) || [];
        setBrands(activeBrands);
      } else {
        toast.error("Failed to fetch brands");
      }
    };
    fetchData();
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
      values.categoryId &&
      values.brandId
    ) {
      try {
        setLoading(true);
        const formData = new FormData();

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
            brand_id: values.brandId,
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
    <div className="min-h-screen bg-gray-50 py-8">
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
      <div className="flex items-center pl-8 justify-between">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/admin/product")}
          className="mb-4 hover:bg-gray-100 transition-colors"
        >
          Back to Products
        </Button>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <Card className="shadow-md rounded-lg">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-gray-800">Add Product</h1>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Form.Item
                  name="name"
                  label={
                    <span className="text-gray-700 font-medium">
                      Product Name
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please enter product name" },
                    { min: 3, message: "Name must be at least 3 characters" },
                  ]}
                >
                  <Input
                    placeholder="Enter product name"
                    className="rounded-md"
                  />
                </Form.Item>

                <Form.Item
                  name="price"
                  label={
                    <span className="text-gray-700 font-medium">Price</span>
                  }
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
                    className="w-full rounded-md"
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
                  name="categoryId"
                  label={
                    <span className="text-gray-700 font-medium">CategoryId</span>
                  }
                  rules={[{ required: true, message: "Please select a category" }]}
                >
                  <Select
                    placeholder="Select a category"
                    options={categories.map((category) => ({
                      value: category.id,
                      label: category.name,
                    }))}
                    className="w-full rounded-md"
                  />
                </Form.Item>

                <Form.Item
                  name="brandId"
                  label={
                    <span className="text-gray-700 font-medium">BrandId</span>
                  }
                  rules={[{ required: true, message: "Please select a brand" }]}
                >
                  <Select
                    placeholder="Select a brand"
                    options={brands.map((brand) => ({
                      value: brand.id,
                      label: brand.name,
                    }))}
                    className="w-full rounded-md"
                  />
                </Form.Item>

                <Form.Item
                  name="brandOrigin"
                  label={
                    <span className="text-gray-700 font-medium">
                      Brand Origin
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please enter brand origin" },
                    { min: 3, message: "Name must be at least 3 characters" },
                  ]}
                >
                  <Input
                    placeholder="Enter brand origin"
                    className="rounded-md"
                  />
                </Form.Item>

                <Form.Item
                  name="placeOfProduction"
                  label={
                    <span className="text-gray-700 font-medium">
                      Place Of Production
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please enter place of production" },
                    { min: 3, message: "Name must be at least 3 characters" },
                  ]}
                >
                  <Input
                    placeholder="Enter place of production"
                    className="rounded-md"
                  />
                </Form.Item>

                <Form.Item
                  name="skinType"
                  label={
                    <span className="text-gray-700 font-medium">
                      Skin Type
                    </span>
                  }
                  rules={[
                    { required: true, message: "Please enter skin type" },
                    { min: 3, message: "Name must be at least 3 characters" },
                  ]}
                >
                  <Input
                    placeholder="Enter skin type"
                    className="rounded-md"
                  />
                </Form.Item>

                <Form.Item
                  name="thumbnail"
                  label={
                    <span className="text-gray-700 font-medium">Thumbnail</span>
                  }
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
              </div>

              <div>
                <CustomEditor 
                  name={"description"} 
                  label={"Description"}
                  rules={[
                    { required: true, message: "Please enter description" },
                    {
                      min: 10,
                      message: "Description must be at least 10 characters",
                    },
                  ]}
                  initialValue={"Enter product description"}
                />

                <CustomEditor
                  name={"ingredient"}
                  label={"Ingredient"}
                  rules={[
                    { required: true, message: "Please enter ingredient" },
                    {
                      min: 10,
                      message: "ingredient must be at least 10 characters",
                    },
                  ]}
                  initialValue={"Enter product ingredient"}
                />

                <CustomEditor
                  name={"instruction"}
                  label={"Instructions for use"}
                  rules={[
                    { required: true, message: "Please enter instruction" },
                    {
                      min: 10,
                      message: "Instruction must be at least 10 characters",
                    },
                  ]}
                  initialValue={"Enter product instruction"}
                />
              </div>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AddProduct;
