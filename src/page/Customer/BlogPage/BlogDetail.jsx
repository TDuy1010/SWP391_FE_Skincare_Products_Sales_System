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
          ← Back to Blog
        </button>
      </div>

      <article>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-light mb-4">
            {article.title}
          </h1>
          <div className="flex items-center text-gray-600 text-sm">
            <span>By Admin</span>
            <span className="mx-2">•</span>
            <span>{article.date || 'March 9, 2025'}</span>
            <span className="mx-2">•</span>
            <span>{article.category || 'Skin Care'}</span>
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
                The skin is our largest organ and acts as a protective barrier against environmental factors. 
                Maintaining a consistent skincare routine is essential for keeping your skin healthy and radiant.
              </p>
              <p className="mb-6 text-gray-700">
                Understanding your skin type is the first step toward developing an effective skincare regimen. 
                Whether you have dry, oily, combination, or sensitive skin, there are specific ingredients and 
                products that can help address your unique concerns.
              </p>
              <p className="mb-6 text-gray-700">
                Regular hydration, sun protection, and nourishment are key components of any successful skincare routine. 
                Additionally, paying attention to your diet, sleep patterns, and stress levels can significantly 
                impact the health and appearance of your skin.
              </p>
            </>
          )}
        </div>
      </article>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-medium mb-6">Related Articles</h3>
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
              <p className="text-sm text-gray-600">{post.date || 'March 9, 2025'}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default BlogDetail;