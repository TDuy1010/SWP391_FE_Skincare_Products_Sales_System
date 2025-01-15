import { motion } from 'framer-motion';
import { blogPosts, featuredArticles } from './BlogPost';
import img3 from '../../assets/img/hero-landingPage.png';

const BlogPage = () => {
  const containerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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
            {blogPosts.map((post, index) => (
              <motion.div 
                key={index}
                className="group cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <div className="aspect-square overflow-hidden mb-4">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{post.description}</p>
                <button className="text-sm text-gray-600 hover:text-black">Read More →</button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Articles Section */}
      {featuredArticles.map((article, index) => (
        <div key={index} className={`py-16 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
            {index % 2 === 0 ? (
              <>
                <div className="aspect-square">
                  <img 
                    src={article.image}
                    alt={article.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="text-2xl mb-4">{article.title}</h2>
                  {article.description.map((paragraph, i) => (
                    <p key={i} className="text-gray-600 mb-6">{paragraph}</p>
                  ))}
                  <button className="text-sm text-gray-600 hover:text-black self-start">
                    Read More →
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col justify-center">
                  <h2 className="text-2xl mb-4">{article.title}</h2>
                  {article.description.map((paragraph, i) => (
                    <p key={i} className="text-gray-600 mb-6">{paragraph}</p>
                  ))}
                  <button className="text-sm text-gray-600 hover:text-black self-start">
                    Read More →
                  </button>
                </div>
                <div className="aspect-square">
                  <img 
                    src={article.image}
                    alt={article.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default BlogPage;