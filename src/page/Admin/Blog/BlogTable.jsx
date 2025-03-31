import React from "react";
import { Table, Button, Space, Tooltip, Switch } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const BlogTable = ({
  blogs,
  loading,
  pagination,
  onPageChange,
  onStatusChange,
  onEditBlog,
  onDeleteBlog,
  onViewDetail,
}) => {
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <div className="flex flex-wrap">
          {image ? (
            <img
              src={image}
              alt="blog"
              className="w-16 h-16 object-cover rounded"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
              No image
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Blog Title",
      dataIndex: "title",
      key: "title",
      sorter: true,
    },
    {
      title: "Author",
      dataIndex: "createdBy",
      key: "createdBy",
      sorter: true,
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      sorter: true,
      render: (date) => {
        if (!date) return null;
        const formattedDate = new Date(date).toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
        return formattedDate;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Switch
          checkedChildren="ACTIVE"
          unCheckedChildren="INACTIVE"
          checked={status === "ACTIVE"}
          onChange={(checked) => onStatusChange(checked, record)}
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
              onClick={() => onViewDetail(record.id)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => onEditBlog(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDeleteBlog(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={blogs}
      loading={loading}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        onChange: onPageChange,
        showSizeChanger: false,
        showTotal: (total) => `Tổng cộng ${total} bài viết`
      }}
      rowKey="id"
    />
  );
};

export default BlogTable; 