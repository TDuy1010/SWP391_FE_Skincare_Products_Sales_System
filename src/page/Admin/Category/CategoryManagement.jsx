import React, { useEffect, useState } from "react";
import { Button, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { getAllCategories, deleteCategory } from "../../../service/category/index";

const CategoryManagement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getAllCategories();
      if (!response.error) {
        setCategories(response.result.categoryResponses);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const showDeleteConfirm = (category) => {
    setSelectedCategory(category);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCategory) return;

    try {
      setLoading(true);
      const response = await deleteCategory(selectedCategory.id);
      if (!response.error) {
        message.success("Category deleted successfully");
        await fetchCategories();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Failed to delete category");
    } finally {
      setLoading(false);
      setDeleteModalVisible(false);
      setSelectedCategory(null);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-[#182237]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Category Management</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/admin/category/add")}
          className="bg-[#0066ff] hover:bg-[#0052cc]"
        >
          Add New Category
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-white">
          <thead className="bg-[#182237] border-b border-gray-700">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Category Name</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b border-gray-700 hover:bg-[#1e2c48]">
                <td className="p-4">
                  {category.thumbnail ? (
                    <img
                      src={category.thumbnail}
                      alt={category.name}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        e.target.src = '/placeholder-image.png';
                        e.target.onerror = null;
                      }}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-500">No image</span>
                    </div>
                  )}
                </td>
                <td className="p-4">{category.name}</td>
                <td className="p-4 max-w-xs truncate">{category.description}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      category.status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {category.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/category/edit/${category.id}`)}
                      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <EditOutlined />
                    </button>
                    <button
                      onClick={() => showDeleteConfirm(category)}
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
        title={
          <div className="flex items-center gap-2 text-red-600">
            <ExclamationCircleOutlined className="text-xl" />
            <span>Delete Category</span>
          </div>
        }
        open={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => {
          setDeleteModalVisible(false);
          setSelectedCategory(null);
        }}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{
          danger: true,
          loading: loading,
        }}
        centered
        maskClosable={false}
        className="[&_.ant-modal-content]:bg-[#182237] [&_.ant-modal-header]:bg-[#182237] [&_.ant-modal-title]:text-white"
      >
        <div className="py-4">
          <p className="text-lg mb-2 text-white">
            Are you sure you want to delete category{" "}
            <strong>"{selectedCategory?.name}"</strong>?
          </p>
          <p className="text-gray-400">
            This action cannot be undone and will permanently delete the category.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default CategoryManagement;
