import React, { useEffect, useState } from "react";
import { Table, Button, Space, Tooltip, Modal, Switch, Input } from "antd";
import { useNavigate } from "react-router-dom";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  getAllQuizzes,
  deleteQuiz,
  changeQuizStatus,
} from "../../../service/quiz/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuizManagement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    keyword: "",
    sortBy: "",
    order: "",
  });

  const fetchQuizzes = async (params = {}) => {
    try {
      setLoading(true);
      const queryParams = {
        page: params.page !== undefined ? params.page - 1 : 0,
        size: params.pageSize || 10,
      };

      if (params.keyword) queryParams.keyword = params.keyword;
      if (params.sortBy) queryParams.sortBy = params.sortBy;
      if (params.order) queryParams.order = params.order;

      const response = await getAllQuizzes(queryParams);

      if (response && response.code === 200) {
        setQuizzes(response.result);
        setPagination({
          ...pagination,
          current: params.page || pagination.current,
          pageSize: params.pageSize || pagination.pageSize,
          total: response.result.length || 0,
        });
      } else {
        toast.error(response?.message || "Unable to load quiz list");
      }
    } catch (error) {
      toast.error("Error loading quiz list");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
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

    fetchQuizzes(params);
  };

  const handleStatusChange = async (checked, quizId) => {
    try {
      setLoading(true);
      const newStatus = checked ? "ACTIVE" : "INACTIVE";

      const response = await changeQuizStatus(quizId, newStatus);

      if (response && response.code === 200) {
        // Update status in the current list
        setQuizzes((prevQuizzes) =>
          prevQuizzes.map((quiz) =>
            quiz.id === quizId ? { ...quiz, status: newStatus } : quiz
          )
        );
        toast.success(
          `Quiz ${checked ? "activated" : "deactivated"} successfully!`
        );
      } else {
        toast.error(response?.message || "Unable to change quiz status");
        // Reload the list to ensure data synchronization
        fetchQuizzes({
          page: pagination.current,
          pageSize: pagination.pageSize,
        });
      }
    } catch (error) {
      toast.error("Error changing quiz status");
      console.error(error);
      // Reload the list to ensure data synchronization
      fetchQuizzes({
        page: pagination.current,
        pageSize: pagination.pageSize,
      });
    } finally {
      setLoading(false);
    }
  };

  const showDeleteConfirm = (quiz) => {
    setSelectedQuiz(quiz);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedQuiz) return;
    try {
      setLoading(true);
      const response = await deleteQuiz(selectedQuiz.id);
      if (response && response.code === 200) {
        await fetchQuizzes({
          page: pagination.current,
          pageSize: pagination.pageSize,
        });
        toast.success("Quiz deleted successfully!");
      } else {
        toast.error(response?.message || "Unable to delete quiz");
      }
    } catch (error) {
      toast.error("Error deleting quiz");
      console.error(error);
    } finally {
      setLoading(false);
      setDeleteModalVisible(false);
      setSelectedQuiz(null);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Switch
          checked={status === "ACTIVE"}
          onChange={(checked) => handleStatusChange(checked, record.id)}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
          loading={loading && selectedQuiz?.id === record.id}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="Details">
            <Button
              type="default"
              icon={<InfoCircleOutlined />}
              onClick={() => navigate(`/admin/quiz/detail/${record.id}`)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => navigate(`/admin/quiz/edit/${record.id}`)}
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
        <h2 className="text-2xl font-bold">Quiz Management</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/admin/quiz/add")}
        >
          Add New Quiz
        </Button>
      </div>
      <div className="mb-4">
        <Input.Search
          placeholder="Search by quiz title"
          onSearch={(value) => {
            const params = {
              page: 1,
              pageSize: pagination.pageSize,
              keyword: value,
            };
            setFilters({ ...filters, keyword: value });
            fetchQuizzes(params);
          }}
          style={{ width: 300 }}
          allowClear
        />
      </div>
      <Table
        columns={columns}
        dataSource={quizzes}
        rowKey="id"
        pagination={{
          ...pagination,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        loading={loading}
        onChange={handleTableChange}
      />
      <Modal
        title="Confirm Deletion"
        open={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => {
          setDeleteModalVisible(false);
          setSelectedQuiz(null);
        }}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete the quiz "{selectedQuiz?.title}"?</p>
        <p>This action cannot be undone.</p>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default QuizManagement;
