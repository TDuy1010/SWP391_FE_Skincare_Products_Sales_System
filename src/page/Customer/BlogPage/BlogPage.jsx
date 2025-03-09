import { motion } from 'framer-motion';
import { blogPosts, featuredArticles } from './BlogPost';
import img3 from '../../../assets/img/hero-landingPage.png';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [blogs, setBlogs] = useState([...blogPosts]);
  const [showOptions, setShowOptions] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log("Blogs state:", blogs);
  }, [blogs]);

  const containerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleReadMore = (post) => {
    setSelectedPost(post);
  };

  const handleAddBlog = (newBlog) => {
    console.log("New Blog Data:", newBlog); // Debug to check the data before adding to state

    setBlogs([
      {
        ...newBlog,
        description: newBlog.descriptions[0], // Take the first description
        images: newBlog.images // Ensure all images are saved
      },
      ...blogs
    ]);
    setShowAddBlog(false);
  };

  const handleEdit = (post) => {
    navigate(`/edit-blog/${post.id}`, { state: { blog: post } }); // Navigate to EditBlog with the blog data
  };

  const handleDelete = (post) => {
    // Implement delete functionality
    console.log("Delete post:", post);
  };

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const decodeHtmlEntities = (text) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  };

  const toggleOptions = (index) => {
    setShowOptions(showOptions === index ? null : index);
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
                className="group cursor-pointer relative"
                whileHover={{ scale: 1.02 }}
                onClick={() => handleReadMore(post)}
              >
                <div className="aspect-square overflow-hidden mb-4">
                  <img 
                    src={post.image || (post.images && post.images.length > 0 ? post.images[0] : 'path/to/placeholder-image.png')} 
                    alt={post.title || 'No Title'} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src = 'path/to/placeholder-image.png'; }}
                  />
                </div>
                <h3 className="text-lg mb-2">{truncateText(post.title || 'No Title', 80)}</h3>
                <p className="text-sm text-gray-600 mb-3" dangerouslySetInnerHTML={{ __html: truncateText(decodeHtmlEntities(post.description || (post.descriptions && post.descriptions.length > 0 ? post.descriptions[0] : "No Description")), 80) }} />
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
            <div className="flex flex-wrap gap-4 mb-4">
              {selectedPost.images && selectedPost.images.length > 0
                ? selectedPost.images.map((image, index) => (
                    <div key={index} className="w-full mb-4 flex flex-col md:flex-row">
                      {index % 2 === 0 ? (
                        <>
                          <img 
                            src={image} 
                            alt={`Blog Image ${index + 1}`} 
                            className="w-full md:w-1/2 h-auto rounded"
                            onError={(e) => { e.target.onerror = null; e.target.src = 'path/to/placeholder-image.png'; }}
                          />
                          {selectedPost.descriptions && selectedPost.descriptions.length > index && (
                            <div className="text-gray-700 mt-4 md:mt-0 md:ml-4 px-8 w-full md:w-1/2" dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(selectedPost.descriptions[index]) }} />
                          )}
                        </>
                      ) : (
                        <>
                          {selectedPost.descriptions && selectedPost.descriptions.length > index && (
                            <div className="text-gray-700 mt-4 md:mt-0 md:mr-4 px-8 w-full md:w-1/2" dangerouslySetInnerHTML={{ __html: decodeHtmlEntities(selectedPost.descriptions[index]) }} />
                          )}
                          <img 
                            src={image} 
                            alt={`Blog Image ${index + 1}`} 
                            className="w-full md:w-1/2 h-auto rounded"
                            onError={(e) => { e.target.onerror = null; e.target.src = 'path/to/placeholder-image.png'; }}
                          />
                        </>
                      )}
                    </div>
                  ))
                : <span>No Image</span>}
            </div>
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