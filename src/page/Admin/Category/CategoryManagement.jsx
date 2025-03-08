import React, { useEffect, useState } from "react";
import { Table, Button, Space, Tooltip, Modal, Tag, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  getAllCategories,
  deleteCategory,
} from "../../../service/category/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';

const CategoryManagement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState("");

  const showDetail = (category) => {
        setSelectedDetail(category.description);
        setDetailModalVisible(true);
      };


  const fetchCategories = async (params = {}) => {
    try {
      setLoading(true);
      const response = await getAllCategories({
        page: params.page - 1 || 0,
        size: params.pageSize || 10,
      });

      if (!response.error) {
        setCategories(response.result.categoryResponses);
        setPagination({
          current: response.result.pageNumber + 1,
          pageSize: response.result.pageSize,
          total: response.result.totalElements,
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleTableChange = (newPagination) => {
    fetchCategories({
      page: newPagination.current,
      pageSize: newPagination.pageSize,
    });
  };


  const handleEditCategory = (category) => {
    navigate(`/admin/category/edit/${category.id}`);
  };
  
  
  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setEditingCategory(null);
  };
  
  const handleEditSuccess = (message) => {
    fetchCategories(); // Refresh danh sách danh mục
    toast.success(message);
    setIsEditModalVisible(false);
  };

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
        await fetchCategories({
          page: pagination.current,
          pageSize: pagination.pageSize,
        });
        toast.success("Category deleted successfully!");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to delete category");
    } finally {
      setLoading(false);
      setDeleteModalVisible(false);
      setSelectedCategory(null);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSuccess = (message) => {
    fetchCategories();
    toast.success(message);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="category"
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      key: "details",
      render: (_, record) => (
        <Button type="link" onClick={() => showDetail(record)}>
          Detail
        </Button>
      ),
    },
    
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => handleEditCategory(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => showDeleteConfirm(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Category Management</h2>
        <Button
          type="primary"
          onClick={showModal}
          className="mb-4"
        >
          Add New Category
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={categories}
        rowKey="id"
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        className="dark-table"
      />
      <Modal
        title="Category Details"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
        <Button key="close" onClick={() => setDetailModalVisible(false)}>
         Close
        </Button>,
        ]}
      >
      <p>{selectedDetail}</p>
      </Modal>

      <Modal
        title="Confirm Delete"
        open={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => {
          setDeleteModalVisible(false);
          setSelectedCategory(null);
        }}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to delete category "{selectedCategory?.name}"?
        </p>
        <p>This action cannot be undone.</p>
      </Modal>
      <AddCategory
        visible={isModalVisible}
        onCancel={handleCancel}
        onSuccess={handleSuccess}
      />
      <EditCategory
        visible={isEditModalVisible}
        onCancel={handleEditCancel}
        categoryData={editingCategory}
        onSuccess={handleEditSuccess}
      />
      <ToastContainer />
    </div>
  );
};

export default CategoryManagement;
