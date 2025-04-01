import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getBlogDetail,
  getPublicBlogs,
} from "../../../service/blogService/customerBlog";
import { Spin, message } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogDetail();
  }, [id]);

  const fetchBlogDetail = async () => {
    try {
      setLoading(true);
      const response = await getBlogDetail(id);

      if (!response.error) {
        setBlog(response.result);
        // Sau khi lấy được chi tiết blog, fetch các blog liên quan
        fetchRelatedBlogs();
      } else {
        message.error(response.message);
        navigate("/blog"); // Chuyển về trang blog nếu không tìm thấy
      }
    } catch (error) {
      console.error("Failed to fetch blog details", error);
      message.error("Không thể tải thông tin blog");
      navigate("/blog");
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async () => {
    try {
      const response = await getPublicBlogs({
        page: 0,
        size: 3,
        status: "ACTIVE",
      });

      if (!response.error) {
        // Lọc bỏ blog hiện tại khỏi danh sách blog liên quan
        const filteredBlogs = response.result.content.filter(
          (b) => b.id !== parseInt(id)
        );
        setRelatedBlogs(filteredBlogs.slice(0, 3));
      }
    } catch (error) {
      console.error("Failed to fetch related blogs", error);
    }
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).locale("vi").format("DD MMMM, YYYY");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="mb-6">
        <button
          onClick={() => navigate("/blog")}
          className="text-gray-600 hover:text-black"
        >
          ← Quay lại Blog
        </button>
      </div>

      <article className="overflow-hidden">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-light mb-4 break-words">
            {blog.title}
          </h1>
          <div className="flex items-center text-gray-600 text-sm">
            <span>Đăng bởi {blog.createdBy || "Admin"}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(blog.createdDate)}</span>
          </div>
        </header>

        {blog.image && (
          <div className="mb-10 aspect-video w-full">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}

        <div
          className="prose prose-lg max-w-none break-words whitespace-pre-wrap overflow-hidden"
          style={{
            wordWrap: "break-word",
            overflowWrap: "break-word",
            wordBreak: "break-word",
          }}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>

      {relatedBlogs.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-medium mb-6">Bài Viết Khác</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedBlogs.map((relatedBlog) => (
              <div
                key={relatedBlog.id}
                className="group cursor-pointer"
                onClick={() => {
                  navigate(`/blog/${relatedBlog.id}`);
                  window.scrollTo(0, 0);
                }}
              >
                <div className="aspect-square overflow-hidden mb-3">
                  <img
                    src={relatedBlog.image}
                    alt={relatedBlog.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/path/to/placeholder-image.png";
                    }}
                  />
                </div>
                <h4 className="font-medium mb-1 group-hover:text-gray-900 line-clamp-2 break-words">
                  {relatedBlog.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {formatDate(relatedBlog.createdDate)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default BlogDetail;
