import React, { useEffect, useState } from "react";
import { Table, Button, Space, Tooltip, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { FaEye } from "react-icons/fa";
import {
  getAllBlogs,
  deleteBlog,
} from "../../../service/blog/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddBlog from './AddBlog';
import EditBlog from './EditBlog';

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
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState("");

  const showDetail = (blog) => {
    setSelectedDetail(blog.contents.join("\n\n"));
    setDetailModalVisible(true);
  };

  const fetchBlogs = async (params = {}) => {
    try {
      setLoading(true);
      const response = await getAllBlogs({
        page: params.page - 1 || 0,
        size: params.pageSize || 10,
      });

      if (!response.error) {
        setBlogs(response.result.blogResponses);
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
      toast.error("Failed to fetch blogs", {
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
    fetchBlogs();
  }, []);

  const handleTableChange = (newPagination) => {
    fetchBlogs({
      page: newPagination.current,
      pageSize: newPagination.pageSize,
    });
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
        toast.success("Blog deleted successfully!", {
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
      toast.error("Failed to delete blog", {
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
  
  const handleEditSuccess = (message) => {
    fetchBlogs();
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
      dataIndex: "thumbnails",
      key: "image",
      render: (thumbnails) => (
        <div className="flex flex-wrap">
          {thumbnails.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="blog"
              className="w-16 h-16 object-cover rounded m-1"
              style={{ flexBasis: "calc(33.33% - 8px)" }}
            />
          ))}
        </div>
      ),
    },
    {
      title: "Blog Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Content",
      key: "details",
      render: (_, record) => (
        <Button type="link" onClick={() => showDetail(record)}>
          <FaEye />
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
              onClick={() => handleEditBlog(record)}
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
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <Button
          type="primary"
          onClick={showAddModal}
          className="mb-4"
        >
          Add New Blog
        </Button>
      </div>
      <div className="shadow-md rounded-lg bg-white">
        <Table
          columns={columns}
          dataSource={blogs}
          rowKey="id"
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>
      <Modal
        title="Blog Details"
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedDetail.split("\n\n").map((content, index) => (
          <p key={index}>{content}</p>
        ))}
      </Modal>
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
      />
      <ToastContainer />
      <EditBlog
        visible={isEditModalVisible}
        onCancel={handleEditCancel}
        blogData={editingBlog}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};

export default BlogManagement;
