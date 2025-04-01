import { useState } from "react";
import { Button, Form, Input, DatePicker, Select, Card, Row, Col, InputNumber, Divider } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { 
  ArrowLeftOutlined, 
  TagOutlined, 
  PercentageOutlined, 
  DollarOutlined, 
  ShoppingCartOutlined, 
  TrophyOutlined, 
  FileTextOutlined 
} from "@ant-design/icons";
import { createVoucher } from "../../../service/voucher";
import { useNavigate } from "react-router-dom";

function AddNewVoucher({ fetchVouchers }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const formattedValues = {
        code: values.voucherCode.trim(),
        discount: parseFloat(values.discountAmount),
        discountType: values.discountType,
        minOrderValue: parseFloat(values.minOrderValue),
        description: values.description.trim(),
        point: parseInt(values.point),
      };

      const response = await createVoucher(formattedValues);

      if (response.code === 201) {
        form.resetFields();
        toast.success(response.message);
        if (fetchVouchers) {
          await fetchVouchers();
        }
        navigate("/admin/voucher");
      } else {
        toast.error(response.message || "Failed to create voucher");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while creating the voucher");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-6">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-full max-w-6xl">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/admin/voucher")}
          className="mb-4 hover:bg-gray-100 flex items-center"
        >
          <span className="ml-1">Back to Vouchers</span>
        </Button>

        <Card
          title={
            <div className="flex items-center space-x-2">
              <TagOutlined className="text-blue-500" />
              <span className="text-2xl font-bold">Add New Voucher</span>
            </div>
          }
          className="w-full shadow-md"
          headStyle={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            borderBottom: "2px solid #f0f0f0",
          }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
            className="space-y-4"
          >
            <Divider orientation="left">Voucher Information</Divider>
            
            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="voucherCode"
                  label="Voucher Code"
                  rules={[
                    { required: true, message: "Please enter a voucher code" },
                    { min: 3, message: "Code must be at least 3 characters" }
                  ]}
                >
                  <Input
                    prefix={<TagOutlined />}
                    placeholder="Enter voucher code"
                    className="h-10 text-base"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="discountType"
                  label="Discount Type"
                  initialValue="FIXED_AMOUNT"
                  rules={[{ required: true, message: "Please select discount type" }]}
                >
                  <Select
                    className="h-10 text-base"
                    placeholder="Select discount type"
                    suffixIcon={<PercentageOutlined />}
                  >
                    <Select.Option value="FIXED_AMOUNT">
                      Fixed Amount (VND)
                    </Select.Option>
                    <Select.Option value="PERCENTAGE">Percentage (%)</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="discountAmount"
                  label="Discount Amount"
                  rules={[
                    { required: true, message: "Please enter a discount amount" },
                    {
                      type: "number",
                      transform: (value) => Number(value),
                      message: "Please enter a valid number",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        const discountType = getFieldValue("discountType");
                        if (discountType === "PERCENTAGE" && value > 100) {
                          return Promise.reject(
                            "Percentage cannot be greater than 100%"
                          );
                        }
                        if (value <= 0) {
                          return Promise.reject("Amount must be greater than 0");
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <InputNumber
                    prefix={<DollarOutlined />}
                    placeholder={`Enter discount ${
                      form.getFieldValue("discountType") === "PERCENTAGE"
                        ? "(0-100)"
                        : "amount"
                    }`}
                    className="h-10 text-base w-full"
                    min={0.01}
                    step={form.getFieldValue("discountType") === "PERCENTAGE" ? 1 : 10000}
                    formatter={value =>
                      form.getFieldValue("discountType") === "PERCENTAGE"
                        ? `${value}%`
                        : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={value =>
                      value
                        .replace(/\%/g, '')
                        .replace(/,/g, '')
                    }
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  name="minOrderValue"
                  label="Minimum Order Value"
                  rules={[
                    { required: true, message: "Please enter minimum order value" },
                    {
                      type: "number",
                      min: 0.1,
                      transform: (value) => Number(value),
                      message: "Value must be greater than 0",
                    },
                  ]}
                >
                  <InputNumber
                    prefix={<ShoppingCartOutlined />}
                    placeholder="Minimum amount for voucher to apply"
                    className="h-10 text-base w-full"
                    min={0}
                    step={10000}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/,/g, '')}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Divider orientation="left">Additional Details</Divider>

            <Form.Item
              name="point"
              label="Points Required"
              rules={[
                { required: true, message: "Please enter points required" },
                {
                  type: "number",
                  transform: (value) => Number(value),
                  min: 0,
                  message: "Points must be a positive number"
                },
              ]}
              tooltip="Number of points a customer needs to redeem this voucher"
            >
              <InputNumber
                prefix={<TrophyOutlined />}
                placeholder="Enter points required to redeem"
                className="h-10 text-base w-full"
                min={0}
                step={50}
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Please enter a description" },
                { min: 10, message: "Description must be at least 10 characters" },
              ]}
            >
              <Input.TextArea
                prefix={<FileTextOutlined />}
                rows={4}
                placeholder="Enter detailed description of the voucher terms and conditions"
                className="text-base"
                showCount
                maxLength={500}
              />
            </Form.Item>

            <div className="flex justify-end pt-6 border-t border-gray-200 mt-8">
              <Button
                className="mr-4 hover:bg-gray-100"
                onClick={() => form.resetFields()}
                size="large"
              >
                Reset
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                className="min-w-[140px] hover:opacity-90"
                icon={<TagOutlined />}
              >
                Add Voucher
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default AddNewVoucher;