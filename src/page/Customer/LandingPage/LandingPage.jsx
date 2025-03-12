import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import img1 from "../../../assets/img/hero-photo.png";
import heroImg from "../../../assets/img/hero-landingPage.png";
import img2 from "../../../assets/img/Section 01.png";
import { useEffect, useState } from "react";
import { getAllProduct } from "../../../service/getAllProduct/getAllProduct";

const LandingPage = () => {
  // State để lưu danh sách sản phẩm
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cuộn lên đầu trang khi component được mount
    window.scrollTo(0, 0);
    
    // Gọi API để lấy sản phẩm
    const fetchFeaturedProducts = async () => {
      try {
        // Lấy 4 sản phẩm mới nhất để hiển thị
        const params = {
          page: 1,
          size: 4,
          sort: "createdAt,desc" // Sắp xếp theo ngày tạo, mới nhất trước
        };
        
        const response = await getAllProduct(params);
        
        if (response.error) {
          setError(response.message);
        } else {
          setFeaturedProducts(response.result.productResponses || []);
        }
      } catch (err) {
        console.error("Failed to fetch featured products:", err);
        setError("Failed to load featured products");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const slideIn = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { duration: 1 } },
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <motion.div
        className="relative h-screen w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={img2}
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-8">
            <motion.div 
              className="max-w-2xl text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl font-light mb-6">Natural Beauty Essentials</h1>
              <p className="text-xl mb-8 leading-relaxed">
                Discover skincare products made with natural ingredients that nurture and enhance your skin's natural beauty.
              </p>
              <Link 
                to="/shop" 
                className="inline-flex items-center bg-white text-black px-8 py-4 transition-all hover:bg-opacity-90"
              >
                <span className="mr-4">Shop Collection</span>
                <FaArrowRight />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Featured Product */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-8">
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-light mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most loved products, carefully formulated to give you the best results for your skin.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {loading ? (
              <div className="col-span-4 text-center py-12">
                <p className="text-gray-500">Loading featured products...</p>
              </div>
            ) : error ? (
              <div className="col-span-4 text-center py-12">
                <p className="text-red-500">{error}</p>
              </div>
            ) : featuredProducts.length === 0 ? (
              <div className="col-span-4 text-center py-12">
                <p className="text-gray-500">No products available at the moment.</p>
              </div>
            ) : (
              featuredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={fadeIn}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))
            )}
          </motion.div>
          
          <motion.div 
            className="text-center mt-12"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link 
              to="/shop"
              className="inline-flex items-center text-gray-800 hover:text-black"
            >
              <span className="mr-2">View All Products</span>
              <FaArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Banner Section */}
      <motion.div
        className="relative min-h-[420px] max-h-[480px] w-full"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImg})`
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative flex flex-col items-start pt-12 max-w-4xl ml-12 mt-4 px-6 text-white">
          <p className="text-sm uppercase tracking-wide mb-4">Revitalize Your Body</p>
          <h1 className="text-4xl font-semibold mb-6">
            Effective Ingredients for Visible Results
          </h1>
          <p className="text-lg mb-8 leading-relaxed">
            Our body products are rich in highly effective ingredients, achieve
            visible results, firm the skin and leave it feeling soft and supple.
            Fine textures that are quickly absorbed, non-greasy and in no way
            inferior to facial care.
          </p>
          <Link to="/shop">
            <motion.button
              className="bg-transparent border border-white text-white py-2 px-6 rounded-md hover:bg-white hover:text-black transition"
              whileHover={{ scale: 1.1 }}
            >
              Discover More
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* About Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-2 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h1 className="text-3xl font-light mb-6">Our Story</h1>
            <p className="text-gray-600 mb-6">
              Our line features meticulous skin, face and body care
              formulations, crafted with both efficacy and sensory delight in
              focus.
            </p>
            <p className="text-gray-600 mb-8">
              We are dedicated to creating top-quality skin, face and body care
              products. We extensively research plant-based and lab-made
              ingredients to ensure both safety and proven effectiveness.
            </p>
            <Link
              to="/about-us"
              className="inline-flex items-center text-black hover:opacity-75 transition-opacity"
            >
              <div className="border border-black px-8 py-4 flex items-center justify-between min-w-[300px]">
                <span className="text-gray-700">Learn about our story</span>
                <FaArrowRight className="ml-4" />
              </div>
            </Link>
          </motion.div>
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img
              src={img1}
              alt="Skincare Application"
              className="w-full h-[500px] object-cover"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;