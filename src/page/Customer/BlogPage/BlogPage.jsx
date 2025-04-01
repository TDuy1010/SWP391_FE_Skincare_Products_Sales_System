import { motion } from "framer-motion";
import { featuredArticles } from "./BlogPost";
import img3 from "../../../assets/img/hero-landingPage.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPublicBlogs } from "../../../service/blogService/customerBlog";
import { Spin, message, Pagination } from "antd";

const BlogPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
    total: 0,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogs({
      page: pagination.current,
      pageSize: pagination.pageSize
    });
  }, [pagination.current, pagination.pageSize]);

  const fetchBlogs = async (params = {}) => {
    try {
      setLoading(true);
      const apiPage = params.page ;
      console.log("Fetching page:", params.page, "API page:", apiPage);
      
      const response = await getPublicBlogs({
        page: apiPage,
        size: params.pageSize || pagination.pageSize,
      });

      console.log("API response:", response);

      if (!response.error) {
        const blogData = response.result.content || [];
        console.log("Blog data received:", blogData);
        setBlogs(blogData);
        
        setPagination(prev => ({
          ...prev,
          current: params.page,
          pageSize: response.result.pageSize || 8,
          total: response.result.totalElements || 0,
        }));
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error("Fetch blogs error:", error);
      message.error("Không thể tải danh sách blog");
    } finally {
      setLoading(false);
    }
  };

  const handleReadMore = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const handlePageChange = (page, pageSize) => {
    fetchBlogs({
      page: page,
      pageSize: pageSize
    });
  };

  const containerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerAnimation}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <div className="relative h-[500px] w-full">
        <img
          src={img3}
          alt="Chăm Sóc Da"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-white text-5xl font-light">Chăm Sóc Da</h1>
            <p className="text-white mt-4 max-w-xl">
              Làn da luôn thay đổi theo môi trường, lối sống và chế độ ăn uống.
              Dòng sản phẩm của chúng tôi được tạo ra với sự cân nhắc này, giải
              quyết các vấn đề phòng ngừa và nhu cầu khác nhau để giúp bạn đạt
              được sức khỏe da tối ưu.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Grid Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl font-light">Chuyên Mục Của Chúng Tôi</h2>
            <p className="text-gray-600">Hiểu biết về sức khỏe và sắc đẹp</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spin size="large" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                {blogs.map((blog) => (
                  <motion.div
                    key={blog.id}
                    className="group cursor-pointer relative"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleReadMore(blog.id)}
                  >
                    <div className="aspect-square overflow-hidden mb-4">
                      <img
                        src={blog.image || "path/to/placeholder-image.png"}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "path/to/placeholder-image.png";
                        }}
                      />
                    </div>
                    <h3 className="text-lg mb-2 line-clamp-2">{blog.title}</h3>
                    <div 
                      className="text-sm text-gray-600 mb-3 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReadMore(blog.id);
                      }}
                      className="text-sm text-gray-600 hover:text-black"
                    >
                      Xem Thêm →
                    </button>
                  </motion.div>
                ))}
              </div>
              
              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <Pagination
                  current={pagination.current}
                  pageSize={pagination.pageSize}
                  total={pagination.total}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPage;
