import { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Statistic,
  Table,
  Tag,
  DatePicker,
  Spin,
  Alert,
  Typography,
  Divider
} from 'antd';
import {
  ShoppingCartOutlined,
  UserOutlined,
  DollarOutlined,
  ShoppingOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Đăng ký các thành phần ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const { Title: AntTitle } = Typography;
const { RangePicker } = DatePicker;

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState({
    totalRevenue: 125750000,
    totalOrders: 278,
    totalUsers: 524,
    totalProducts: 42,
    revenueChange: 12.5,
    orderChange: 8.3,
    userChange: 15.2,
    productChange: -3.1
  });

  // Dữ liệu cho biểu đồ doanh thu theo tháng
  const revenueData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    datasets: [
      {
        label: 'Doanh thu (VND)',
        data: [5000000, 7500000, 10000000, 8500000, 12000000, 15000000, 13500000, 17000000, 14500000, 16000000, 18000000, 20250000],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.4
      }
    ]
  };

  // Dữ liệu cho biểu đồ top sản phẩm bán chạy
  const topProductsData = {
    labels: ['Serum dưỡng ẩm', 'Kem chống nắng', 'Nước tẩy trang', 'Mặt nạ dưỡng', 'Kem dưỡng da'],
    datasets: [
      {
        label: 'Số lượng bán ra',
        data: [150, 120, 90, 80, 75],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderWidth: 1,
      }
    ]
  };

  // Dữ liệu cho biểu đồ phân bổ đơn hàng theo trạng thái
  const orderStatusData = {
    labels: ['Đã giao hàng', 'Đang vận chuyển', 'Đang xử lý', 'Đã hủy'],
    datasets: [
      {
        data: [45, 30, 20, 5],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
        borderWidth: 1,
      }
    ]
  };

  // Dữ liệu cho bảng đơn hàng gần đây
  const recentOrders = [
    {
      key: '1',
      id: 'ORD-001',
      customer: 'Nguyễn Văn A',
      date: '10/03/2025',
      amount: '1,250,000 VNĐ',
      status: 'Đã giao hàng',
    },
    {
      key: '2',
      id: 'ORD-002',
      customer: 'Trần Thị B',
      date: '09/03/2025',
      amount: '850,000 VNĐ',
      status: 'Đang vận chuyển',
    },
    {
      key: '3',
      id: 'ORD-003',
      customer: 'Lê Văn C',
      date: '08/03/2025',
      amount: '1,500,000 VNĐ',
      status: 'Đang xử lý',
    },
    {
      key: '4',
      id: 'ORD-004',
      customer: 'Phạm Thị D',
      date: '07/03/2025',
      amount: '950,000 VNĐ',
      status: 'Đã hủy',
    },
    {
      key: '5',
      id: 'ORD-005',
      customer: 'Hoàng Văn E',
      date: '06/03/2025',
      amount: '2,350,000 VNĐ',
      status: 'Đã giao hàng',
    },
  ];

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'green';
        if (status === 'Đang vận chuyển') color = 'gold';
        else if (status === 'Đang xử lý') color = 'blue';
        else if (status === 'Đã hủy') color = 'red';
        
        return (
          <Tag color={color}>
            {status}
          </Tag>
        );
      },
    },
  ];

  useEffect(() => {
    // Mô phỏng việc tải dữ liệu từ API
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Cấu hình chung cho các biểu đồ
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const handleDateChange = (dates) => {
    // Xử lý khi thay đổi khoảng thời gian
    console.log('Date range changed:', dates);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <AntTitle level={2} className="mb-1">Dashboard</AntTitle>
          <div className="text-gray-600">
            <HomeOutlined /> <a href="/admin" className="text-blue-500 hover:underline">Admin</a> / <span>Dashboard</span>
          </div>
        </div>
        <div>
          <RangePicker onChange={handleDateChange} />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {/* Thống kê tổng quan */}
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} sm={12} md={6}>
              <Card bordered={false} className="h-full shadow-sm hover:shadow-md transition-shadow">
                <Statistic
                  title="Tổng doanh thu"
                  value={statistics.totalRevenue}
                  precision={0}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<DollarOutlined />}
                  suffix="VNĐ"
                  formatter={(value) => `${value.toLocaleString('vi-VN')}`}
                />
                <div className="mt-2">
                  {statistics.revenueChange >= 0 ? (
                    <Tag color="green">
                      <ArrowUpOutlined /> {statistics.revenueChange}% so với tháng trước
                    </Tag>
                  ) : (
                    <Tag color="red">
                      <ArrowDownOutlined /> {Math.abs(statistics.revenueChange)}% so với tháng trước
                    </Tag>
                  )}
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card bordered={false} className="h-full shadow-sm hover:shadow-md transition-shadow">
                <Statistic
                  title="Tổng đơn hàng"
                  value={statistics.totalOrders}
                  valueStyle={{ color: '#1890ff' }}
                  prefix={<ShoppingCartOutlined />}
                />
                <div className="mt-2">
                  {statistics.orderChange >= 0 ? (
                    <Tag color="green">
                      <ArrowUpOutlined /> {statistics.orderChange}% so với tháng trước
                    </Tag>
                  ) : (
                    <Tag color="red">
                      <ArrowDownOutlined /> {Math.abs(statistics.orderChange)}% so với tháng trước
                    </Tag>
                  )}
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card bordered={false} className="h-full shadow-sm hover:shadow-md transition-shadow">
                <Statistic
                  title="Người dùng"
                  value={statistics.totalUsers}
                  valueStyle={{ color: '#722ed1' }}
                  prefix={<UserOutlined />}
                />
                <div className="mt-2">
                  {statistics.userChange >= 0 ? (
                    <Tag color="green">
                      <ArrowUpOutlined /> {statistics.userChange}% so với tháng trước
                    </Tag>
                  ) : (
                    <Tag color="red">
                      <ArrowDownOutlined /> {Math.abs(statistics.userChange)}% so với tháng trước
                    </Tag>
                  )}
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card bordered={false} className="h-full shadow-sm hover:shadow-md transition-shadow">
                <Statistic
                  title="Sản phẩm"
                  value={statistics.totalProducts}
                  valueStyle={{ color: '#fa8c16' }}
                  prefix={<ShoppingOutlined />}
                />
                <div className="mt-2">
                  {statistics.productChange >= 0 ? (
                    <Tag color="green">
                      <ArrowUpOutlined /> {statistics.productChange}% so với tháng trước
                    </Tag>
                  ) : (
                    <Tag color="red">
                      <ArrowDownOutlined /> {Math.abs(statistics.productChange)}% so với tháng trước
                    </Tag>
                  )}
                </div>
              </Card>
            </Col>
          </Row>

          {/* Biểu đồ doanh thu */}
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24}>
              <Card 
                title="Doanh thu theo tháng" 
                bordered={false}
                className="shadow-sm hover:shadow-md transition-shadow"
              >
                <div style={{ height: '400px' }}>
                  <Line data={revenueData} options={chartOptions} />
                </div>
              </Card>
            </Col>
          </Row>

          {/* Biểu đồ phụ và bảng đơn hàng */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12} className="mb-6">
              <Card 
                title="Top sản phẩm bán chạy" 
                bordered={false}
                className="h-full shadow-sm hover:shadow-md transition-shadow"
              >
                <div style={{ height: '300px' }}>
                  <Bar data={topProductsData} options={chartOptions} />
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={12} className="mb-6">
              <Card 
                title="Phân bổ trạng thái đơn hàng" 
                bordered={false}
                className="h-full shadow-sm hover:shadow-md transition-shadow"
              >
                <div style={{ height: '300px' }}>
                  <Pie data={orderStatusData} options={chartOptions} />
                </div>
              </Card>
            </Col>
            <Col xs={24}>
              <Card 
                title="Đơn hàng gần đây" 
                bordered={false}
                className="shadow-sm hover:shadow-md transition-shadow"
              >
                <Table 
                  columns={columns}
                  dataSource={recentOrders}
                  pagination={{ pageSize: 5 }}
                />
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Dashboard;