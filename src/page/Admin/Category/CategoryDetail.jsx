import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Spin, Typography, Divider } from "antd";
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";
import { getCategoryById } from "../../../service/category/index";
import { toast } from "react-toastify";

const { Title, Text } = Typography;

const CategoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategoryById(id);
        if (!response.error) {
          setCategory(response.result);
        } else {
          toast.error(response.message);
          navigate("/admin/category");
        }
      } catch (error) {
        toast.error("Failed to fetch category details");
        navigate("/admin/category");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
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
          onClick={() => navigate("/admin/category")}
          className="hover:bg-blue-50 flex items-center"
          size="large"
        >
          Back to Categories
        </Button>
        <Title level={2} className="m-0 text-blue-700">
          Category Details
        </Title>
      </div>

      {category && (
        <Card 
          bordered={false} 
          className="shadow-lg rounded-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category Image Section */}
            <div className="flex flex-col items-center justify-start">
              <div className="w-full h-64 overflow-hidden rounded-lg shadow-md mb-4 border border-gray-200">
                <img
                  src={category.thumbnail}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <Title level={4} className="text-center text-gray-800 font-bold mb-0">
                {category.name}
              </Title>
              <Text type="secondary" className="text-center italic">
                Category ID: {id}
              </Text>
            </div>

            {/* Category Details Section */}
            <div className="md:col-span-2">
              <div className="bg-white p-6 rounded-lg">
                <Title level={3} className="text-blue-600 mb-4">
                  About this Category
                </Title>
                <Divider className="my-3" />
                
                <div className="mb-6">
                  <Title level={5} className="text-gray-700">Description</Title>
                  <div
                    dangerouslySetInnerHTML={{ __html: category.description }}
                    className="prose prose-sm md:prose-base max-w-none text-gray-600 mt-2 leading-relaxed"
                  />
                </div>
                
                <Divider className="my-4" />
                
                <div className="flex justify-end mt-6">
                  <Button 
                    type="primary" 
                    icon={<EditOutlined />}
                    onClick={() => navigate(`/admin/category/edit/${id}`)}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Edit Category
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

export default CategoryDetail;