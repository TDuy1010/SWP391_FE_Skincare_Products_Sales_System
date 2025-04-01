import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Spin, Image, Typography, Divider, Tag } from "antd";
import { ArrowLeftOutlined, CalendarOutlined, UserOutlined, EditOutlined } from "@ant-design/icons";
import { getBlogById } from "../../../service/blogService/index";
import { toast } from "react-toastify";

const { Title, Text } = Typography;

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await getBlogById(id);

        if (!response.error) {
          setBlog(response.result);
        } else {
          toast.error(response.message || "Unable to retrieve blog information");
          navigate("/admin/blog");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("An error occurred while loading blog information");
        navigate("/admin/blog");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id, navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/admin/blog")}
          className="hover:bg-blue-50 flex items-center"
          size="large"
        >
          Back to Blogs
        </Button>
        <Title level={2} className="m-0 text-blue-700">
          Blog Details
        </Title>
      </div>

      {blog && (
        <Card 
          bordered={false} 
          className="shadow-lg rounded-xl overflow-hidden"
        >
          <div className="space-y-8">
            {/* Blog Header Section */}
            <div className="text-center mb-8">
              <Title level={2} className="text-gray-800 mb-2">
                {blog.title}
              </Title>
              
              <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
                <Tag icon={<UserOutlined />} color="blue">
                  {blog.createdBy || "Unknown Author"}
                </Tag>
                <Tag icon={<CalendarOutlined />} color="green">
                  {formatDate(blog.createdDate)}
                </Tag>
                <Tag color="purple">
                  Blog ID: {id}
                </Tag>
              </div>
              
              <Divider className="my-4" />
            </div>

            {/* Blog Featured Image */}
            <div className="flex justify-center mb-8">
              {blog.image ? (
                <div className="overflow-hidden rounded-xl shadow-lg border border-gray-200 max-w-3xl">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    className="object-cover transition-transform hover:scale-105 duration-300"
                    style={{ maxHeight: "500px" }}
                  />
                </div>
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded-lg shadow-md flex items-center justify-center">
                  No Image Available
                </div>
              )}
            </div>

            {/* Blog Content */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <Title level={3} className="text-blue-600 mb-4">
                Content
              </Title>
              <Divider className="my-3" />
              
              <div
                dangerouslySetInnerHTML={{
                  __html: blog.content || "<p>No content available</p>",
                }}
                className="prose prose-sm md:prose-base lg:prose-lg max-w-none overflow-hidden text-gray-700 leading-relaxed"
                style={{
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
              />
            </div>

            {/* Gallery Section */}
            {blog.gallery && blog.gallery.length > 0 && (
              <div className="bg-white p-8 rounded-xl shadow-md mt-8">
                <Title level={3} className="text-blue-600 mb-4">
                  Gallery
                </Title>
                <Divider className="my-3" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {blog.gallery.map((image, index) => (
                    <div key={index} className="overflow-hidden rounded-lg shadow-md border border-gray-200">
                      <Image
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="object-cover w-full transition-transform hover:scale-105 duration-300"
                        style={{ height: "200px" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
          </div>
        </Card>
      )}

      <style jsx global>{`
        .prose img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
        }

        .prose pre {
          overflow-x: auto;
          white-space: pre-wrap;
          word-wrap: break-word;
          background-color: #f3f4f6;
          padding: 1rem;
          border-radius: 0.5rem;
        }

        .prose table {
          width: 100%;
          table-layout: fixed;
          overflow-wrap: break-word;
          border-collapse: collapse;
        }
        
        .prose table th,
        .prose table td {
          border: 1px solid #e5e7eb;
          padding: 0.75rem;
        }

        .prose table th {
          background-color: #f3f4f6;
        }

        .prose * {
          max-width: 100%;
        }

        .prose blockquote {
          margin-left: 0;
          padding: 1rem 1.5rem;
          border-left: 4px solid #3b82f6;
          background-color: #f3f4f6;
          border-radius: 0.25rem;
          font-style: italic;
          color: #4b5563;
        }
        
        .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
          color: #1f2937;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }
        
        .prose a {
          color: #2563eb;
          text-decoration: underline;
        }
        
        .prose a:hover {
          color: #1d4ed8;
        }
      `}</style>
    </div>
  );
};

export default BlogDetail;