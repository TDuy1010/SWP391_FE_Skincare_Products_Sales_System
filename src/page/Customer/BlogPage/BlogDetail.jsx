import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts, featuredArticles } from './BlogPost';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const allArticles = [...blogPosts, ...featuredArticles];
  const article = allArticles.find(post => post.id === parseInt(id)) || allArticles[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Sau này khi có API, bạn có thể thêm logic fetch dữ liệu ở đây
    // const fetchBlogDetail = async () => {
    //   try {
    //     const response = await fetch(`/api/blogs/${id}`);
    //     const data = await response.json();
    //     setArticle(data);
    //   } catch (error) {
    //     console.error("Failed to fetch blog details", error);
    //   }
    // };
    // fetchBlogDetail();
  }, [id]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="mb-6">
        <button 
          onClick={() => navigate('/blog')}
          className="text-gray-600 hover:text-black"
        >
          ← Quay lại Blog
        </button>
      </div>

      <article>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-light mb-4">
            {article.title}
          </h1>
          <div className="flex items-center text-gray-600 text-sm">
            <span>Đăng bởi Admin</span>
            <span className="mx-2">•</span>
            <span>{article.date || 'Ngày 9 tháng 3, 2025'}</span>
            <span className="mx-2">•</span>
            <span>{article.category || 'Chăm Sóc Da'}</span>
          </div>
        </header>

        <div className="mb-10 aspect-video w-full">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          {Array.isArray(article.description) ? (
            article.description.map((paragraph, index) => (
              <p key={index} className="mb-6 text-gray-700">
                {paragraph}
              </p>
            ))
          ) : (
            <>
              <p className="mb-6 text-gray-700">{article.description}</p>
              <p className="mb-6 text-gray-700">
                Da là cơ quan lớn nhất của chúng ta và đóng vai trò như một hàng rào bảo vệ 
                chống lại các yếu tố môi trường. Duy trì thói quen chăm sóc da đều đặn là điều 
                cần thiết để giữ cho làn da của bạn khỏe mạnh và rạng rỡ.
              </p>
              <p className="mb-6 text-gray-700">
                Hiểu về loại da của bạn là bước đầu tiên để phát triển một chế độ chăm sóc da hiệu quả. 
                Cho dù bạn có làn da khô, da dầu, da hỗn hợp hay da nhạy cảm, đều có những thành phần và 
                sản phẩm cụ thể có thể giúp giải quyết các vấn đề đặc thù của bạn.
              </p>
              <p className="mb-6 text-gray-700">
                Giữ ẩm đều đặn, bảo vệ khỏi ánh nắng mặt trời và nuôi dưỡng là những thành phần chính 
                của bất kỳ quy trình chăm sóc da thành công nào. Ngoài ra, chú ý đến chế độ ăn uống, 
                giấc ngủ và mức độ căng thẳng có thể ảnh hưởng đáng kể đến sức khỏe và vẻ ngoài của làn da bạn.
              </p>
            </>
          )}
        </div>
      </article>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-medium mb-6">Bài Viết Liên Quan</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post, index) => (
            <div 
              key={index} 
              className="group cursor-pointer"
              onClick={() => navigate(`/blog/${post.id || index + 1}`)}
            >
              <div className="aspect-square overflow-hidden mb-3">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h4 className="font-medium mb-1 group-hover:text-gray-900">{post.title}</h4>
              <p className="text-sm text-gray-600">{post.date || 'Ngày 9 tháng 3, 2025'}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BlogDetail;