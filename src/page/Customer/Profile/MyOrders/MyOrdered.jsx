import React, { useState, useEffect } from "react";
import OrderDetail from "./MyOrderedDetail.jsx";
import { getOrderHistory } from "../../../../service/order/index.js";
import { format } from "date-fns";
import { 
  Spin, 
  Empty, 
  Tag, 
  Card, 
  Space, 
  Button, 
  Typography, 
  Pagination,
  Alert,
  List,
  Skeleton
} from "antd";
import {
  ClockCircleOutlined,
  CalendarOutlined,
  CreditCardOutlined,
  HomeOutlined,
  DollarOutlined,
  ShoppingOutlined,
  LeftOutlined,
  RightOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getOrderHistory(currentPage);
        setOrders(response.result.orderResponseList);
        setTotalPages(response.result.totalPages);
      } catch (err) {
        setError("Không thể tải đơn hàng");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage]);

  const getOrderStatusConfig = (status) => {
    switch (status) {
      case "DONE":
        return { color: "success", text: "Hoàn thành" };
      case "DELIVERING":
        return { color: "processing", text: "Đang giao hàng" };
      case "PENDING":
        return { color: "warning", text: "Đang xử lý" };
      case "PROCESSING":
        return { color: "blue", text: "Đang chuẩn bị" };
      case "CANCELLED":
        return { color: "error", text: "Đã hủy" };
      case "DELIVERING_FAIL":
        return { color: "orange", text: "Giao hàng thất bại" };
      default:
        return { color: "default", text: status };
    }
  };

  const getPaymentStatusConfig = (status) => {
    return status === "PAID" 
      ? { color: "success", text: "Đã thanh toán" }
      : { color: "warning", text: "Chưa thanh toán" };
  };

  if (loading && orders.length === 0) {
    return (
      <div className="p-6 bg-white w-full max-w-full border rounded-md flex justify-center items-center min-h-[300px]">
        <Spin size="large" tip="Đang tải đơn hàng..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white w-full max-w-full border rounded-md">
        <Alert message="Lỗi" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white w-full max-w-full border rounded-md shadow-sm">
      {selectedOrder ? (
        <OrderDetail
          order={selectedOrder}
          onBack={() => setSelectedOrder(null)}
        />
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <Title level={4} className="m-0">
              <ShoppingOutlined className="mr-2" />
              Lịch sử đơn hàng
            </Title>
          </div>

          {orders.length === 0 ? (
            <Empty 
              description="Bạn chưa có đơn hàng nào" 
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              className="py-12" 
            />
          ) : (
            <>
              <div className="max-h-[600px] overflow-y-auto pr-2">
                <List
                  itemLayout="vertical"
                  dataSource={orders}
                  loading={loading}
                  renderItem={order => (
                    <Card 
                      hoverable
                      className="mb-4 overflow-hidden"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Skeleton loading={loading} active avatar={false}>
                        <div className="flex justify-between items-center flex-wrap gap-2">
                          <Title level={5} className="m-0 flex items-center">
                            <ShoppingOutlined className="mr-2" />
                            Đơn hàng #{order.orderId}
                          </Title>
                          <Space>
                            <Tag 
                              icon={<ClockCircleOutlined />}
                              color={getOrderStatusConfig(order.status).color}
                            >
                              {getOrderStatusConfig(order.status).text}
                            </Tag>
                            <Tag 
                              icon={<CreditCardOutlined />}
                              color={getPaymentStatusConfig(order.paymentStatus).color}
                            >
                              {getPaymentStatusConfig(order.paymentStatus).text}
                            </Tag>
                          </Space>
                        </div>

                        <div className="mt-3">
                          <Text className="flex items-center text-gray-600">
                            <CalendarOutlined className="mr-2" />
                            {format(new Date(order.orderDate), "dd/MM/yyyy HH:mm")}
                          </Text>
                          
                          <Space direction="vertical" className="mt-2 w-full">
                            <Text className="flex items-center text-gray-600">
                              <CreditCardOutlined className="mr-2" />
                              Phương thức thanh toán: {order.paymentMethod}
                            </Text>
                            
                            <Text className="flex items-center text-gray-600">
                              <HomeOutlined className="mr-2" />
                              Địa chỉ giao hàng: {order.address.addressLine}
                            </Text>
                          </Space>
                        </div>
                        
                        <div className="text-right mt-3">
                          <Text strong className="flex items-center justify-end text-lg">
                            <DollarOutlined className="mr-2" />
                            Tổng tiền: {order.totalAmount.toLocaleString()} đ
                          </Text>
                        </div>
                      </Skeleton>
                    </Card>
                  )}
                />
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-6 sticky bottom-0 bg-white py-4">
                  <Pagination
                    current={currentPage}
                    total={totalPages * 10}
                    onChange={setCurrentPage}
                    showSizeChanger={false}
                    itemRender={(page, type) => {
                      if (type === 'prev') {
                        return <Button icon={<LeftOutlined />} size="small">Trước</Button>;
                      }
                      if (type === 'next') {
                        return <Button icon={<RightOutlined />} size="small">Tiếp</Button>;
                      }
                      return page;
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;