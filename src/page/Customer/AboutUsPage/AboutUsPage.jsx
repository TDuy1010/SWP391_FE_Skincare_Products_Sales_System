import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import img1 from '../../../assets/img/hero-photo.png';
import aboutImg2 from '../../../assets/img/product-1.png';
import aboutImg3 from '../../../assets/img/trial-image.png';

const AboutUsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl font-light mb-6">Our Story</h1>
            <p className="text-gray-600 mb-6">
              Our line features meticulous skin, face and body care formulations, crafted with both efficacy and sensory delight in focus.
            </p>
            <p className="text-gray-600 mb-8">
              We are dedicated to creating top-quality skin, face and body care products. We extensively research plant-based and lab-made ingredients to ensure both safety and proven effectiveness. As our distinctive stores, knowledgeable consultants are eager to introduce you to the lineup range and assist with your choices.
            </p>
            <Link 
              to="/products" 
              className="inline-flex items-center text-black hover:opacity-75 transition-opacity"
            >
              <div className="border border-black px-8 py-4 flex items-center justify-between min-w-[300px]">
                <span className="text-gray-700">Our approach to products</span>
                <FaArrowRight className="ml-4" />
              </div>
            </Link>
          </div>
          <div>
            <img 
              src={img1} 
              alt="Skincare Application" 
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Nature Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-light mb-6">
                Countless solutions have been discovered in nature. We simply need to observe and tap into its inherent brilliance.
              </h2>
              <Link 
              to="/products" 
              className="inline-flex items-center text-black hover:opacity-75 transition-opacity"
            >
              <div className="border border-black px-8 py-4 flex items-center justify-between min-w-[300px]">
                <span className="text-gray-700"> Discover Products</span>
                <FaArrowRight className="ml-4" />
              </div>
            </Link>
            </div>
            <div>
              <img 
                src={aboutImg2} 
                alt="Natural Ingredients" 
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
          <div className="w-full">
            <img 
              src={aboutImg3} 
              alt="Product Application" 
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Formulation Section */}
      <section className="py-16 bg-[#F5F5F3]">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl font-light mb-4">
            Our formulations are rooted in nature's most valuable raw materials, enhanced with modern technologies to ensure optimal results for your skin.
          </h2>
          <p className="text-gray-600 uppercase tracking-wider">
            THE FUTURE OF NATURAL SKINCARE
          </p>
        </div>
      </section>

      {/* Quality Section */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-[600px]">
          <img 
            src={img1} 
            alt="Skin Close-up" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 p-12 flex flex-col justify-end text-white">
            <h3 className="text-sm uppercase tracking-wider mb-4">Our Credo</h3>
            <h2 className="text-2xl font-light mb-6">Quality & Efficacy</h2>
            <p className="mb-8">
              Be those serious about skin health, trust someone dedicated since 1986. With over 35 years of crafting natural skincare, we bring unparalleled expertise and experience. Our mission is to create products beneficial for both body and planet.
            </p>
            <Link 
              to="/products" 
              className="inline-flex items-center text-black hover:opacity-75 transition-opacity"
            >
              <div className="border border-white px-8 py-4 flex items-center justify-between min-w-[300px]">
                <span className="text-white">Our best sellers</span>
                <FaArrowRight className="ml-4" />
              </div>
            </Link>
          </div>
        </div>
        <div className="relative h-[600px]">
          <img 
            src={img1} 
            alt="Laboratory" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 p-12 flex flex-col justify-end text-white">
            <h2 className="text-2xl font-light mb-6">High tech Natural Skin Care</h2>
            <p className="mb-8">
              We build our formulas on nature's most precious raw materials, refined with modern technologies to guarantee the best results for your skin.
            </p>
            <Link 
              to="/products" 
              className="inline-flex items-center text-black hover:opacity-75 transition-opacity"
            >
              <div className="border border-white px-8 py-4 flex items-center justify-between min-w-[300px]">
                <span className="text-white"> Discover more</span>
                <FaArrowRight className="ml-4" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
   