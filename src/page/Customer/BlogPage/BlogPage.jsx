import { motion } from 'framer-motion';
import { blogPosts, featuredArticles } from './BlogPost';
import img3 from '../../../assets/img/hero-landingPage.png';
import { useEffect, useState } from "react";
import AddBlog from './AddBlog';

const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [blogs, setBlogs] = useState(blogPosts);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleReadMore = (post) => {
    setSelectedPost(post);
  };

  const handleAddBlog = (newBlog) => {
    setBlogs([newBlog, ...blogs]);
    setShowAddBlog(false);
  };

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const decodeHtmlEntities = (text) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
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
          alt="Skin Care" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-white text-5xl font-light">Skin Care</h1>
            <p className="text-white mt-4 max-w-xl">
              The skin is constantly changing, influenced by the environment, lifestyle, and diet. Our range is crafted with this in consideration, addressing various prevention and needs to help you achieve optimal skin health.
            </p>
          </div>
        </div>
      </div>

      {/* Add My Blogs Button */}
      <div className="py-4 px-4 text-right">
        <button 
          className="py-4 px-14 text-xl font-bold rounded border border-gray-500 hover:border-blue-600 hover:text-blue-600"
          onClick={() => setShowAddBlog(true)}
        >
          Add My Blogs
        </button>
      </div>

      {/* Add Blog Form */}
      {showAddBlog && (
        <AddBlog visible={showAddBlog} onAddBlog={handleAddBlog} onClose={() => setShowAddBlog(false)} />
      )}

      {/* Journal Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl font-light">Our Journal</h2>
            <p className="text-gray-600">Insights into health and Well-being</p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {blogs.map((post, index) => (
              <motion.div 
                key={index}
                className="group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={() => handleReadMore(post)}
              >
                <div className="aspect-square overflow-hidden mb-4">
                  <img 
                    src={post.images && post.images.length > 0 ? post.images[0] : 'path/to/placeholder-image.png'} 
                    alt={post.title || 'No Title'} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'path/to/placeholder-image.png'; }}
                  />
                </div>
                <h3 className="text-lg mb-2">{truncateText(post.title || 'No Title', 80)}</h3>
                <p className="text-sm text-gray-600 mb-3" dangerouslySetInnerHTML={{ __html: truncateText(decodeHtmlEntities(post.descriptions && post.descriptions.length > 0 ? post.descriptions[0] : 'No Description'), 80) }} />
                <button 
                  className="text-sm text-gray-600 hover:text-black"
                >
                  Read More →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded max-w-6xl w-full max-h-[80vh] overflow-y-auto relative">
            <button 
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
              onClick={() => setSelectedPost(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-4xl font-bold mb-4 text-center">{selectedPost.title || 'No Title'}</h2>
            <p className="text-gray-600 mb-4 text-center">Author: {selectedPost.author || 'Unknown'}</p>
            <div className="flex justify-center mb-4">
              {selectedPost.images && selectedPost.images.length > 0 && selectedPost.images.map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={selectedPost.title || 'No Title'} 
                  className="w-1/3 h-auto rounded mb-4"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'path/to/placeholder-image.png'; }}
                />
              ))}
            </div>
            {selectedPost.descriptions && selectedPost.descriptions.length > 0 && selectedPost.descriptions.map((description, index) => (
              <div key={index} className="text-gray-700 mb-4 px-8" dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(description) }} />
            ))}
            <div className="flex justify-center">
              <button 
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                onClick={() => setSelectedPost(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      
    </motion.div>
  );
};

export default BlogPage;