import React, { useEffect, useState } from "react";
import { Button, Space, Modal, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import {
  getAllBlogs,
  deleteBlog,
  changeBlogStatus,
} from "../../../service/blogService/index";
import AddBlog from "./AddBlog";
import EditBlog from "./EditBlog";
import BlogTable from "./BlogTable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Hàm hiển thị toast với ID duy nhất để tránh lặp lại
const showToast = (type, message, options = {}) => {
  // Đóng tất cả toast hiện tại trước khi hiển thị toast mới
  toast.dismiss();

  // Hiển thị toast mới với ID duy nhất
  const toastId = `toast-${Date.now()}`;

  const defaultOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    toastId: toastId,
    ...options,
  };

  switch (type) {
    case "success":
      toast.success(message, defaultOptions);
      break;
    case "error":
      toast.error(message, defaultOptions);
      break;
    case "warning":
      toast.warning(message, defaultOptions);
      break;
    case "info":
      toast.info(message, defaultOptions);
      break;
    default:
      toast(message, defaultOptions);
  }

  return toastId;
};

const BlogManagement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [filters, setFilters] = useState({
    keyword: "",
  });

  const fetchBlogs = async (params = {}) => {
    try {
      setLoading(true);
      const queryParams = {
        page: params.page !== undefined ? params.page - 1 : 0,
        size: params.pageSize || 10,
      };

      if (params.keyword) queryParams.keyword = params.keyword;

      const response = await getAllBlogs(queryParams);

      if (!response.error) {
        const blogData = response.result.content || [];
        const processedBlogs = blogData.map((blog) => ({
          ...blog,
          thumbnails: blog.thumbnails || [],
        }));

        setBlogs(processedBlogs);
        setPagination({
          current: (response.result.pageNumber || 0) + 1,
          pageSize: response.result.pageSize || 10,
          total: response.result.totalElements || 0,
        });
      } else {
        showToast("error", response.message);
      }
    } catch (error) {
      console.error("Fetch blogs error:", error);
      showToast("error", "Không thể tải danh sách blog");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleTableChange = (newPagination, tableFilters, sorter) => {
    const params = {
      ...filters,
      page: newPagination.current,
      pageSize: newPagination.pageSize,
    };

    if (sorter.field) {
      params.sortBy = sorter.field;
      params.order = sorter.order ? sorter.order.replace("end", "") : undefined;
    }

    fetchBlogs(params);
  };

  const showDeleteConfirm = (blog) => {
    setSelectedBlog(blog);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedBlog) return;

    try {
      setLoading(true);
      const response = await deleteBlog(selectedBlog.id);

      if (!response.error) {
        await fetchBlogs({
          page: pagination.current,
          pageSize: pagination.pageSize,
        });
        showToast("success", "Xóa blog thành công");
      } else {
        showToast("error", response.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      showToast("error", "Không thể xóa blog");
    } finally {
      setLoading(false);
      setDeleteModalVisible(false);
      setSelectedBlog(null);
    }
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setIsEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setEditingBlog(null);
  };

  const handleEditSuccess = (msg) => {
    fetchBlogs();
    showToast("success", msg || "Cập nhật blog thành công");
    setIsEditModalVisible(false);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddSuccess = (msg) => {
    fetchBlogs();
    showToast("success", msg || "Thêm blog thành công");
    setIsAddModalVisible(false);
  };

  const handleStatusChange = async (checked, record) => {
    try {
      setLoading(true);
      const newStatus = checked ? "ACTIVE" : "INACTIVE";
      const response = await changeBlogStatus(record.id, newStatus);

      if (!response.error) {
        showToast("success", "Thay đổi trạng thái blog thành công");
        // Refresh trang hiện tại
        fetchBlogs({
          page: pagination.current,
          pageSize: pagination.pageSize,
        });
      } else {
        showToast("error", response.message);
        // Revert lại trạng thái switch nếu có lỗi
        record.status = !checked ? "ACTIVE" : "INACTIVE";

        if (response.message.includes("đăng nhập lại")) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
      }
    } catch (error) {
      console.error("Status change error:", error);
      showToast("error", "Có lỗi xảy ra khi thay đổi trạng thái blog");
      // Revert lại trạng thái switch nếu có lỗi
      record.status = !checked ? "ACTIVE" : "INACTIVE";
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
          Add New Blog
        </Button>
      </div>
      <BlogTable
        blogs={blogs}
        loading={loading}
        pagination={pagination}
        onTableChange={handleTableChange}
        onStatusChange={handleStatusChange}
        onEditBlog={handleEditBlog}
        onDeleteBlog={showDeleteConfirm}
        onViewDetail={(id) => navigate(`/admin/blog/detail/${id}`)}
      />
      <Modal
        title="Confirm Delete"
        open={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => {
          setDeleteModalVisible(false);
          setSelectedBlog(null);
        }}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete blog "{selectedBlog?.title}"?</p>
        <p>This action cannot be undone.</p>
      </Modal>
      <AddBlog
        visible={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onSuccess={handleAddSuccess}
        showToast={showToast}
      />
      <EditBlog
        visible={isEditModalVisible}
        onCancel={handleEditCancel}
        blogData={editingBlog}
        onSuccess={handleEditSuccess}
        showToast={showToast}
      />

      {/* Cấu hình ToastContainer */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        limit={1}
        style={{ zIndex: 9999 }}
      />
    </div>
  );
};

export default BlogManagement;
