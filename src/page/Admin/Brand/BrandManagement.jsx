import React, { useEffect, useState } from "react";
import { Table, Button, Space, Tooltip, Modal, Tag, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  getAllBrands,
  deleteBrand,
} from "../../../service/brand/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddBrand from './AddBrand';
import EditBrand from './EditBrand';

const BrandManagement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
const [selectedDetail, setSelectedDetail] = useState("");

const showDetail = (brand) => {
  setSelectedDetail(brand.description);
  setDetailModalVisible(true);
};


  const fetchBrands = async (params = {}) => {
    try {
      setLoading(true);
      const response = await getAllBrands({
        page: params.page - 1 || 0,
        size: params.pageSize || 10,
      });

      if (!response.error) {
        setBrands(response.result.brandResponses);
        setPagination({
          current: response.result.pageNumber + 1,
          pageSize: response.result.pageSize,
          total: response.result.totalElements,
        });
      } else {
        toast.error(response.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error("Failed to fetch brands", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleTableChange = (newPagination) => {
    fetchBrands({
      page: newPagination.current,
      pageSize: newPagination.pageSize,
    });
  };

  const showDeleteConfirm = (brand) => {
    setSelectedBrand(brand);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedBrand) return;

    try {
      setLoading(true);
      const response = await deleteBrand(selectedBrand.id);

      if (!response.error) {
        await fetchBrands({
          page: pagination.current,
          pageSize: pagination.pageSize,
        });
        toast.success("Brand deleted successfully!", {
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
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete brand", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
      setDeleteModalVisible(false);
      setSelectedBrand(null);
    }
  };

  const handleEditBrand = (brand) => {
    setEditingBrand(brand);
    setIsEditModalVisible(true);
  };
  
  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setEditingBrand(null);
  };
  
  const handleEditSuccess = (message) => {
    fetchBrands();
    toast.success(message);
    setIsEditModalVisible(false);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddSuccess = (message) => {
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
          alt="brand"
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
    {
      title: "Brand Name",
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
              onClick={() => handleEditBrand(record)}
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
        <h2 className="text-2xl font-bold">Brand Management</h2>
        <Button
          type="primary"
          onClick={showAddModal}
          className="mb-4"
        >
          Add New Brand
        </Button>
      </div>
      <div className="shadow-md rounded-lg bg-white">
        <Table
          columns={columns}
          dataSource={brands}
          rowKey="id"
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>
      <Modal
              title="Brand Details"
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
          setSelectedBrand(null);
        }}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete brand "{selectedBrand?.name}"?</p>
        <p>This action cannot be undone.</p>
      </Modal>
      <AddBrand
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onSuccess={handleAddSuccess}
      />
      <ToastContainer />
      <EditBrand
      visible={isEditModalVisible}
      onCancel={handleEditCancel}
      brandData={editingBrand}
      onSuccess={handleEditSuccess}
      />
    </div>
  );
};

export default BrandManagement;