import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Spin, Image } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { getBlogById } from "../../../service/blogService/index";
import { toast } from "react-toastify";

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
          toast.error(response.message || "Không thể lấy thông tin blog");
          navigate("/admin/blog");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Có lỗi xảy ra khi tải thông tin blog");
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
    return new Date(dateString).toLocaleDateString("vi-VN", {
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
    <div className="p-6 max-w-6xl mx-auto">
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/admin/blog")}
        className="mb-4"
      >
        Back to Blogs
      </Button>

      <Card title="Blog Details">
        {blog && (
          <div className="space-y-8">
            <div className="flex justify-center">
              {blog.image ? (
                <Image
                  src={blog.image}
                  alt={blog.title}
                  className="object-cover rounded-lg shadow-md"
                  style={{ maxHeight: "400px" }}
                />
              ) : (
                <div className="w-64 h-64 bg-gray-200 rounded-lg shadow-md flex items-center justify-center">
                  No Image Available
                </div>
              )}
            </div>

            <div className="border-b pb-4">
              <h3 className="font-bold text-lg mb-2 text-gray-800">
                Blog Title
              </h3>
              <p className="text-gray-700 text-lg">{blog.title}</p>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-bold text-lg mb-2 text-gray-800">Author</h3>
              <p className="text-gray-700">{blog.createdBy || "Unknown"}</p>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-bold text-lg mb-2 text-gray-800">
                Created Date
              </h3>
              <p className="text-gray-700">{formatDate(blog.createdDate)}</p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">Content</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: blog.content || "<p>No content available</p>",
                }}
                className="prose prose-sm md:prose-base lg:prose-lg max-w-none overflow-hidden"
                style={{
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
              />
            </div>

            {blog.gallery && blog.gallery.length > 0 && (
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">
                  Gallery
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {blog.gallery.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="object-cover rounded-lg shadow-md"
                      style={{ height: "180px" }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Card>

      <style jsx global>{`
        .prose img {
          max-width: 100%;
          height: auto;
        }

        .prose pre {
          overflow-x: auto;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .prose table {
          width: 100%;
          table-layout: fixed;
          overflow-wrap: break-word;
        }

        .prose * {
          max-width: 100%;
        }

        .prose blockquote {
          margin-left: 0;
          padding-left: 1rem;
          border-left: 4px solid #e5e7eb;
        }
      `}</style>
    </div>
  );
};

export default BlogDetail;
