import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Tooltip,
  Modal,
  Descriptions,
  Tag,
  Spin,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  getAllVouchers,
  deleteVoucher,
  getVoucherById,
} from "../../../service/voucher/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";

const VoucherManagement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletingVoucherId, setDeletingVoucherId] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [voucherDetail, setVoucherDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Fetch vouchers from API
  const fetchVouchers = async (page = 0, pageSize = 10) => {
    try {
      setLoading(true);
      const response = await getAllVouchers(page, pageSize);

      if (response && response.code === 200) {
        setVouchers(response.result.content);
        setPagination({
          current: response.result.pageNumber + 1,
          pageSize: response.result.pageSize,
          total: response.result.totalElements,
        });
      } else {
        toast.error(response.message || "Failed to fetch vouchers");
      }
    } catch (error) {
      toast.error("Failed to fetch vouchers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const handleTableChange = (newPagination) => {
    fetchVouchers(newPagination.current - 1, newPagination.pageSize);
  };

  const showDeleteConfirm = (voucher) => {
    setSelectedVoucher(voucher);
    setDeleteModalVisible(true);
  };

  const showVoucherDetails = async (voucher) => {
    setSelectedVoucher(voucher);
    setViewModalVisible(true);
    setLoadingDetail(true);

    try {
      const response = await getVoucherById(voucher.id);
      if (!response.error) {
        setVoucherDetail(response.result);
      } else {
        toast.error(response.message || "Failed to fetch voucher details");
      }
    } catch (error) {
      toast.error("Failed to fetch voucher details");
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedVoucher) return;

    try {
      setDeletingVoucherId(selectedVoucher.id);
      const response = await deleteVoucher(selectedVoucher.id);

      if (!response.error) {
        setVouchers((prevVouchers) =>
          prevVouchers.filter((voucher) => voucher.id !== selectedVoucher.id)
        );
        setPagination((prev) => ({ ...prev, total: prev.total - 1 }));
        toast.success("Voucher deleted successfully!");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete voucher");
    } finally {
      setDeletingVoucherId(null);
      setDeleteModalVisible(false);
      setSelectedVoucher(null);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Voucher Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount, record) =>
        record.discountType === "PERCENTAGE"
          ? `${discount}%`
          : `${discount.toLocaleString()}đ`,
    },
    {
      title: "Minimum Order Value",
      dataIndex: "minOrderValue",
      key: "minOrderValue",
      render: (value) => `${value.toLocaleString()}đ`,
    },
    {
      title: "Points Required",
      dataIndex: "point",
      key: "point",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) =>
        deletingVoucherId === record.id ? (
          <LoadingOutlined />
        ) : (
          <Space>
            <Tooltip title="View Details">
              <Button
                icon={<EyeOutlined />}
                onClick={() => showVoucherDetails(record)}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => showDeleteConfirm(record)}
                disabled={deletingVoucherId === record.id}
              />
            </Tooltip>
          </Space>
        ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Voucher Management</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/admin/voucher/add")}
        >
          Add New Voucher
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={vouchers}
        rowKey="id"
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => {
          setDeleteModalVisible(false);
          setSelectedVoucher(null);
        }}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>
          Are you sure you want to delete voucher "{selectedVoucher?.code}"?
        </p>
        <p>This action cannot be undone.</p>
      </Modal>

      {/* Voucher Detail Modal */}
      <Modal
        title="Voucher Details"
        open={viewModalVisible}
        onCancel={() => {
          setViewModalVisible(false);
          setVoucherDetail(null);
        }}
        footer={[
          <Button
            key="close"
            onClick={() => {
              setViewModalVisible(false);
              setVoucherDetail(null);
            }}
          >
            Close
          </Button>,
        ]}
        width={700}
      >
        {loadingDetail ? (
          <div className="flex justify-center items-center py-10">
            <Spin size="large" />
          </div>
        ) : voucherDetail ? (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="ID">{voucherDetail.id}</Descriptions.Item>
            <Descriptions.Item label="Code">
              {voucherDetail.code}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {voucherDetail.description || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Discount Type">
              {voucherDetail.discountType}
            </Descriptions.Item>
            <Descriptions.Item label="Discount">
              {voucherDetail.discountType === "PERCENTAGE"
                ? `${voucherDetail.discount}%`
                : `${voucherDetail.discount.toLocaleString()}đ`}
            </Descriptions.Item>
            <Descriptions.Item label="Minimum Order Value">
              {voucherDetail.minOrderValue.toLocaleString()}đ
            </Descriptions.Item>
            <Descriptions.Item label="Points Required">
              {voucherDetail.point}
            </Descriptions.Item>
            <Descriptions.Item label="Quantity">
              {voucherDetail.quantity}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <p>No voucher details available</p>
        )}
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default VoucherManagement;
