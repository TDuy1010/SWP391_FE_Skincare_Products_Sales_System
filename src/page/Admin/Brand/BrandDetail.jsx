import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Spin, Typography, Divider } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { getBrandById } from "../../../service/brand/index";
import { toast } from "react-toastify";

const { Title, Text } = Typography;

const BrandDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await getBrandById(id);
        if (!response.error) {
          setBrand(response.result);
        } else {
          toast.error(response.message);
          navigate("/admin/brand");
        }
      } catch (error) {
        toast.error("Failed to fetch brand details");
        navigate("/admin/brand");
      } finally {
        setLoading(false);
      }
    };

    fetchBrand();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/admin/brand")}
          className="hover:bg-blue-50 flex items-center"
          size="large"
        >
          Back to Brands
        </Button>
        <Title level={2} className="m-0 text-blue-700">
          Brand Details
        </Title>
      </div>

      {brand && (
        <Card 
          bordered={false} 
          className="shadow-lg rounded-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Image Section */}
            <div className="flex flex-col items-center justify-start">
              <div className="w-full h-64 overflow-hidden rounded-lg shadow-md mb-4 border border-gray-200">
                <img
                  src={brand.thumbnail}
                  alt={brand.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <Title level={4} className="text-center text-gray-800 font-bold mb-0">
                {brand.name}
              </Title>
              <Text type="secondary" className="text-center italic">
                Brand ID: {id}
              </Text>
            </div>

            {/* Brand Details Section */}
            <div className="md:col-span-2">
              <div className="bg-white p-6 rounded-lg">
                <Title level={3} className="text-blue-600 mb-4">
                  About the Brand
                </Title>
                <Divider className="my-3" />
                
                <div className="mb-6">
                  <Title level={5} className="text-gray-700">Description</Title>
                  <div
                    dangerouslySetInnerHTML={{ __html: brand.description }}
                    className="prose prose-sm md:prose-base max-w-none text-gray-600 mt-2 leading-relaxed"
                  />
                </div>
                
                <Divider className="my-4" />
                
                <div className="flex justify-end mt-6">
                  <Button 
                    type="primary" 
                    onClick={() => navigate(`/admin/brand/edit/${id}`)}
                    className="bg-blue-500 hover:bg-blue-600 mr-2"
                  >
                    Edit Brand
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default BrandDetail;