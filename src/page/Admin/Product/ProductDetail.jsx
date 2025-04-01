import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Button,
  Spin,
  Descriptions,
  Modal,
  Form,
  InputNumber,
  DatePicker,
  Table,
  Space,
  Popconfirm,
  Typography,
  Divider,
  Tag,
} from "antd";
import {
  ArrowLeftOutlined,
  InboxOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  TagOutlined,
  ShoppingOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { getProductById } from "../../../service/productManagement";
import {
  addNewBatch,
  getBatches,
  deleteBatch,
} from "../../../service/productManagement/index";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Title, Text } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addBatchModalVisible, setAddBatchModalVisible] = useState(false);
  const [viewBatchesModalVisible, setViewBatchesModalVisible] = useState(false);
  const [batches, setBatches] = useState([]);
  const [batchesLoading, setBatchesLoading] = useState(false);
  const [deletingBatch, setDeletingBatch] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        if (!response.error) {
          setProduct(response.result);
        } else {
          toast.error(response.message);
          navigate("/admin/product");
        }
      } catch (error) {
        toast.error("Failed to fetch product details");
        navigate("/admin/product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const fetchBatches = async () => {
    setBatchesLoading(true);
    try {
      const response = await getBatches(id);
      if (!response.error) {
        const batchData = response.result?.content || [];
        setBatches(batchData);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch batches");
    } finally {
      setBatchesLoading(false);
    }
  };

  const handleAddBatch = async (values) => {
    try {
      const batchData = {
        quantity: values.quantity,
        manufactureDate: values.manufactureDate.format("YYYY-MM-DD"),
        expirationDate: values.expirationDate.format("YYYY-MM-DD"),
      };

      const response = await addNewBatch(id, batchData);
      if (!response.error) {
        toast.success("Batch added successfully");
        setAddBatchModalVisible(false);
        form.resetFields();
        // Refresh batches list if viewing
        if (viewBatchesModalVisible) {
          fetchBatches();
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to add batch");
    }
  };

  const handleViewBatches = () => {
    setViewBatchesModalVisible(true);
    fetchBatches();
  };

  const handleDeleteBatch = async (batchId) => {
    setDeletingBatch(true);
    try {
      const response = await deleteBatch(batchId);
      if (!response.error) {
        toast.success("Batch deleted successfully");
        // Refresh batches list
        fetchBatches();
      } else {
        toast.error(response.message || "Failed to delete batch");
      }
    } catch (error) {
      toast.error("Failed to delete batch");
      console.error("Delete batch error:", error);
    } finally {
      setDeletingBatch(false);
    }
  };

  const batchColumns = [
    {
      title: "Batch Code",
      dataIndex: "batchCode",
      key: "batchCode",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Manufacture Date",
      dataIndex: "manufactureDate",
      key: "manufactureDate",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Expiration Date",
      dataIndex: "expirationDate",
      key: "expirationDate",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Delete this batch?"
          description="Are you sure you want to delete this batch? This action cannot be undone."
          onConfirm={() => handleDeleteBatch(record.id)}
          okText="Yes"
          cancelText="No"
          okButtonProps={{ loading: deletingBatch }}
        >
          <Button
            danger
            icon={<DeleteOutlined />}
            size="small"
            loading={deletingBatch}
          >
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/admin/product")}
          className="hover:bg-blue-50 flex items-center"
          size="large"
        >
          Back to Products
        </Button>
        <Title level={2} className="m-0 text-blue-700">
          Product Details
        </Title>
      </div>

      {product && (
        <Card 
          bordered={false} 
          className="shadow-lg rounded-xl overflow-hidden mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product Image Section */}
            <div className="flex flex-col items-center justify-start">
              <div className="w-full h-80 overflow-hidden rounded-lg shadow-md mb-4 border border-gray-200">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <Title level={4} className="text-center text-gray-800 font-bold mb-0">
                {product.name}
              </Title>
              <div className="flex flex-wrap justify-center items-center gap-2 mt-2">
                <Tag icon={<TagOutlined />} color="blue">
                  {product.category?.name}
                </Tag>
                <Tag icon={<ShoppingOutlined />} color="green">
                  {product.brand?.name}
                </Tag>
                <Tag color="purple">
                  ID: {id}
                </Tag>
              </div>
              
              <div className="mt-4 w-full">
                <Card className="bg-blue-50 border-blue-100">
                  <div className="text-center">
                    <Title level={5} className="m-0 text-blue-700">Price</Title>
                    <Text className="text-xl font-bold text-blue-800">{product.price?.toLocaleString("vi-VN")}đ</Text>
                  </div>
                </Card>
              </div>
              
              <div className="mt-4 w-full">
                <Card className="bg-green-50 border-green-100">
                  <div className="text-center">
                    <Title level={5} className="m-0 text-green-700">Stock</Title>
                    <Text className="text-xl font-bold text-green-800">{product.stock || 0}</Text>
                  </div>
                </Card>
              </div>
              
              <div className="mt-6 w-full flex gap-2">
                <Button 
                  type="primary" 
                  icon={<EditOutlined />}
                  onClick={() => navigate(`/admin/product/edit/${id}`)}
                  className="bg-blue-500 hover:bg-blue-600 flex-1"
                >
                  Edit Product
                </Button>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="md:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                {/* Batch Management */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <Title level={4} className="m-0 text-blue-700">
                      <InboxOutlined className="mr-2" /> Batch Management
                    </Title>
                    <Space>
                      <Button
                        type="primary"
                        icon={<InboxOutlined />}
                        onClick={handleViewBatches}
                        className="bg-indigo-500 hover:bg-indigo-600"
                      >
                        View Batches
                      </Button>
                      <Button
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        onClick={() => setAddBatchModalVisible(true)}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        Add Batch
                      </Button>
                    </Space>
                  </div>
                </div>
                
                <Divider className="my-6" />

                {/* Description */}
                {product.description && (
                  <div className="mb-8">
                    <Title level={4} className="text-blue-700 mb-4">
                      Description
                    </Title>
                    <div
                      dangerouslySetInnerHTML={{ __html: product.description }}
                      className="prose prose-sm md:prose-base max-w-none text-gray-700 bg-gray-50 p-4 rounded-lg"
                    />
                  </div>
                )}

                {/* Ingredient */}
                {product.ingredient && (
                  <div className="mb-8">
                    <Title level={4} className="text-blue-700 mb-4">
                      Ingredients
                    </Title>
                    <div
                      dangerouslySetInnerHTML={{ __html: product.ingredient }}
                      className="prose prose-sm md:prose-base max-w-none text-gray-700 bg-gray-50 p-4 rounded-lg"
                    />
                  </div>
                )}

                {/* Usage Instruction */}
                {product.usageInstruction && (
                  <div className="mb-8">
                    <Title level={4} className="text-blue-700 mb-4">
                      Usage Instructions
                    </Title>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: product.usageInstruction,
                      }}
                      className="prose prose-sm md:prose-base max-w-none text-gray-700 bg-gray-50 p-4 rounded-lg"
                    />
                  </div>
                )}

                {/* Specification */}
                {product.specification && (
                  <div>
                    <Title level={4} className="text-blue-700 mb-4">
                      Specifications
                    </Title>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <Text className="text-gray-500">Origin</Text>
                          <Text className="font-medium">{product.specification.origin || "N/A"}</Text>
                        </div>
                        <div className="flex flex-col">
                          <Text className="text-gray-500">Brand Origin</Text>
                          <Text className="font-medium">{product.specification.brandOrigin || "N/A"}</Text>
                        </div>
                        <div className="flex flex-col">
                          <Text className="text-gray-500">Manufacturing Location</Text>
                          <Text className="font-medium">{product.specification.manufacturingLocation || "N/A"}</Text>
                        </div>
                        <div className="flex flex-col">
                          <Text className="text-gray-500">Skin Type</Text>
                          <Text className="font-medium">{product.specification.skinType || "N/A"}</Text>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Add Batch Modal */}
      <Modal
        title={
          <div className="flex items-center text-blue-700">
            <PlusCircleOutlined className="mr-2" /> Add New Batch
          </div>
        }
        open={addBatchModalVisible}
        onCancel={() => {
          setAddBatchModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        className="rounded-lg overflow-hidden"
      >
        <Form form={form} layout="vertical" onFinish={handleAddBatch}>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[
              { required: true, message: "Please input quantity" },
              {
                type: "number",
                min: 1,
                message: "Quantity must be greater than 0",
              },
            ]}
          >
            <InputNumber className="w-full" placeholder="Enter quantity" />
          </Form.Item>

          <Form.Item
            name="manufactureDate"
            label="Manufacture Date"
            rules={[
              { required: true, message: "Please select manufacture date" },
            ]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            name="expirationDate"
            label="Expiration Date"
            rules={[
              { required: true, message: "Please select expiration date" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || !getFieldValue("manufactureDate")) {
                    return Promise.resolve();
                  }
                  if (value.isBefore(getFieldValue("manufactureDate"))) {
                    return Promise.reject(
                      "Expiration date must be after manufacture date"
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <div className="flex justify-end space-x-4 mt-6">
            <Button
              onClick={() => {
                setAddBatchModalVisible(false);
                form.resetFields();
              }}
              className="hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="bg-blue-500 hover:bg-blue-600">
              Add Batch
            </Button>
          </div>
        </Form>
      </Modal>

      {/* View Batches Modal */}
      <Modal
        title={
          <div className="flex items-center text-blue-700">
            <InboxOutlined className="mr-2" /> Batch List
          </div>
        }
        open={viewBatchesModalVisible}
        onCancel={() => setViewBatchesModalVisible(false)}
        footer={null}
        width={800}
        className="rounded-lg overflow-hidden"
      >
        <Table
          columns={batchColumns}
          dataSource={batches}
          rowKey="id"
          loading={batchesLoading}
          pagination={{
            total: batches.length,
            pageSize: 10,
            showSizeChanger: false,
          }}
          className="overflow-hidden rounded-lg"
        />
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;