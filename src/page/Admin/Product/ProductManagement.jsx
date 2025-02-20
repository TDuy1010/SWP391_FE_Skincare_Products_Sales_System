import React, { useEffect, useState } from "react";
import { Button, Tooltip, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getAllProducts, deleteProduct } from "../../../service/product/index";

const ProductManagement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getAllProducts();
      if (!response.error) {
        setProducts(response.result.productResponses);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const showDeleteConfirm = (product) => {
    setProductToDelete(product);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    try {
      const response = await deleteProduct(productToDelete.id);
      if (!response.error) {
        message.success(response.message);
        fetchProducts();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Failed to delete product");
    } finally {
      setDeleteModalVisible(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-[#182237]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Product Management</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/admin/product/add")}
          className="bg-[#0066ff] hover:bg-[#0052cc]"
        >
          Add New Product
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-white">
          <thead className="bg-[#182237] border-b border-gray-700">
            <tr>
              <th className="p-4 text-left">Thumbnail</th>
              <th className="p-4 text-left">Product Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-700 hover:bg-[#1e2c48]">
                <td className="p-4">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">
                  {product.price?.toLocaleString("vi-VN")}đ
                </td>
                <td className="p-4 max-w-xs truncate">{product.description}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      product.status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/product/edit/${product.id}`)}
                      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <EditOutlined />
                    </button>
                    <button
                      onClick={() => showDeleteConfirm(product)}
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        title="Confirm Delete"
        open={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => {
          setDeleteModalVisible(false);
          setProductToDelete(null);
        }}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
        className="[&_.ant-modal-content]:bg-[#182237] [&_.ant-modal-header]:bg-[#182237] [&_.ant-modal-title]:text-white"
      >
        <p className="text-white">
          Are you sure you want to delete product "{productToDelete?.name}"?
        </p>
        <p className="text-white">This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default ProductManagement;
