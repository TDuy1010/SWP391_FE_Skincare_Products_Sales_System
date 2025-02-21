import ProductCard from "../LandingPage/ProductCard";
import { products } from "../LandingPage/ProductList";
import { motion } from "framer-motion";
import img3 from '../../../assets/img/hero-landingPage.png';
import { useEffect } from "react";



const ShopPagce = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <>
    
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
      <div className="bg-gray-100 w-full py-4 overflow-x-auto ">
        <div className="flex justify-center space-x-4">
          <button className="px-4 py-2 border-b-2 border-black">Shop All</button>
          <button className="px-4 py-2">Cleanse</button>
          <button className="px-4 py-2">Exfoliate</button>
          <button className="px-4 py-2">Treat & Masque</button>
          <button className="px-4 py-2">Tone</button>
          <button className="px-4 py-2">Hydrate</button>
          <button className="px-4 py-2">Eyes & Lips</button>
          <button className="px-4 py-2">Sun Care</button>
          <button className="px-4 py-2">Shave</button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-sm text-gray-500 mb-2">Renowned Formulations</h1>
        <h2 className="text-4xl font-light mb-8">Essentials For Every Skincare</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <ProductCard {...product}/>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="text-sm text-gray-500 mb-2">Insights into Health and Well-being</div>
        <h1 className="text-4xl font-light mb-8">Our Journal</h1>
        <div className="overflow-x-auto">
          <div className="whitespace-nowrap mb-6">
            <div className="inline-block w-80 mr-5">
              <img src="https://placehold.co/600x400" alt="Ocean waves" className="w-full h-auto mb-4" />
              <div className="text-xs text-gray-500 mb-1">SKIN CONCIERGE</div>
              <h2 className="text-lg font-semibold mb-2 line-clamp-1">Distinguishing Mineral Sunscreens from Chemical Sunscreens</h2>
              <a href="#" className="text-sm text-gray-600 flex items-center">Read More → <i className="fas fa-arrow-right ml-2"></i></a>
            </div>
            <div className="inline-block w-80 mr-5">
              <img src="https://placehold.co/600x400" alt="Hand holding a skincare product" className="w-full h-auto mb-4" />
              <div className="text-xs text-gray-500 mb-1">SKIN CONCIERGE</div>
              <h2 className="text-lg font-semibold mb-2">The Right Skincare When Traveling</h2>
              <a href="#" className="text-sm text-gray-600 flex items-center">Read More → <i className="fas fa-arrow-right ml-2"></i></a>
            </div>
            <div className="inline-block w-80 mr-5">
              <img src="https://placehold.co/600x400" alt="Person with freckles on their shoulder" className="w-full h-auto mb-4" />
              <div className="text-xs text-gray-500 mb-1">KNOWLEDGE TREASURES</div>
              <h2 className="text-lg font-semibold mb-2">Top 10 Sunscreens in 2024</h2>
              <a href="#" className="text-sm text-gray-600 flex items-center">Read More → <i className="fas fa-arrow-right ml-2"></i></a>
            </div>
            <div className="inline-block w-80 mr-5">
              <img src="https://placehold.co/600x400" alt="Skincare cream on a beige background" className="w-full h-auto mb-4" />
              <div className="text-xs text-gray-500 mb-1">KNOWLEDGE TREASURES</div>
              <h2 className="text-lg font-semibold mb-2">Mastering The Art Of Well Aging</h2>
              <a href="#" className="text-sm text-gray-600 flex items-center">Read More → <i className="fas fa-arrow-right ml-2"></i></a>
            </div>
            <div className="inline-block w-80 mr-5">
              <img src="https://placehold.co/600x400" alt="Skincare cream on a beige background" className="w-full h-auto mb-4" />
              <div className="text-xs text-gray-500 mb-1">KNOWLEDGE TREASURES</div>
              <h2 className="text-lg font-semibold mb-2">Mastering The Art Of Well Aging</h2>
              <a href="#" className="text-sm text-gray-600 flex items-center">Read More → <i className="fas fa-arrow-right ml-2"></i></a>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <a href="#" className="text-sm text-gray-600 flex items-center">All Blog Posts → <i className="fas fa-arrow-right ml-2"></i></a>
        </div>
      </div>
    </>
  )
}

export default ShopPagce