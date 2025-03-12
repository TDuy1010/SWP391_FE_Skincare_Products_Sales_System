import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import img1 from '../../../assets/img/hero-photo.png';
import aboutImg2 from '../../../assets/img/product-1.png';
import aboutImg3 from '../../../assets/img/trial-image.png';
import teamImg1 from '../../../assets/img/photo-1573496359142-b8d87734a5a2.png';
import teamImg2 from '../../../assets/img/photo-1580489944761-15a19d654956.png';
import teamImg3 from '../../../assets/img/photo-1541647376583-8934aaf3448a.png';
import labImg from '../../../assets/img/photo-1581093450021-4a7360e9a6b5.png';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const AboutUsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Banner Full Width */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={img1} 
            alt="Natural Skincare" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-white"
            >
              <h1 className="text-5xl font-light mb-6">The Art of Natural Beauty</h1>
              <p className="text-xl mb-8 leading-relaxed">
                Discover the perfect harmony between nature and science in our premium skincare collection.
              </p>
              <Link 
                to="/shop" 
                className="inline-flex items-center bg-white text-black px-8 py-4 transition-all hover:bg-opacity-90"
              >
                <span className="mr-4">Explore Our Products</span>
                <FaArrowRight />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
          >
            <motion.span 
              variants={fadeInUp}
              className="uppercase tracking-widest text-gray-500 mb-4"
            >
              Our Story
            </motion.span>
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl font-light mb-8"
            >
              Crafted with passion since 2010
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-gray-600 text-lg leading-relaxed mb-6"
            >
              Our journey began with a simple belief: skincare should be effective, natural, and a joy to use. Founded in 2010, Skyn Beauty has grown from a small laboratory into a trusted name in natural skincare, without ever compromising on our core values.
            </motion.p>
            <motion.p 
              variants={fadeInUp} 
              className="text-gray-600 text-lg leading-relaxed"
            >
              We meticulously research plant-based and lab-made ingredients to ensure both safety and proven effectiveness. Our formulations are crafted with both efficacy and sensory delight in focus.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp} className="order-2 md:order-1">
              <h3 className="text-2xl font-light mb-6">Our Philosophy</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At Skyn Beauty, we believe that true beauty comes from balance. Balance between nature and science. Balance between effectiveness and sensory pleasure. Balance between caring for yourself and caring for the planet.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Every product we create embodies this philosophy, resulting in skincare that delivers visible results while being a joy to use every day.
              </p>
              <Link 
                to="/shop" 
                className="inline-flex items-center border border-black px-8 py-4 hover:bg-black hover:text-white transition-all"
              >
                <span className="mr-4">Discover Our Products</span>
                <FaArrowRight />
              </Link>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="order-1 md:order-2 aspect-square overflow-hidden"
            >
              <img 
                src={aboutImg2} 
                alt="Our Products" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-[#F8F7F5]">
        <div className="container mx-auto px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span 
              variants={fadeInUp}
              className="uppercase tracking-widest text-gray-500 mb-4 block"
            >
              Our Values
            </motion.span>
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl font-light mb-6"
            >
              What Guides Us
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="max-w-2xl mx-auto text-gray-600 text-lg"
            >
              Every decision we make is guided by our core values, ensuring that we stay true to our mission of creating exceptional skincare.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-[#E8E6E1] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Natural Ingredients</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe in the power of nature. Our products harness botanical extracts and natural ingredients that have been proven effective through centuries of use and modern research.
              </p>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-[#E8E6E1] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Scientific Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                We enhance nature's gifts with cutting-edge science. Our lab team works tirelessly to create formulations that deliver visible results through innovative technology.
              </p>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-[#E8E6E1] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4">Sustainability</h3>
              <p className="text-gray-600 leading-relaxed">
                We're committed to minimizing our environmental impact. From responsibly sourced ingredients to eco-friendly packaging, sustainability is at the heart of everything we do.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Lab & Innovation Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            <motion.div 
              variants={fadeInUp}
              className="aspect-square overflow-hidden"
            >
              <img 
                src={labImg} 
                alt="Our Laboratory" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <span className="uppercase tracking-widest text-gray-500 mb-4 block">Research & Innovation</span>
              <h3 className="text-3xl font-light mb-6">High-Tech Natural Skin Care</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our state-of-the-art laboratory is where science and nature come together. Our team of cosmetic chemists and botanists work collaboratively to create formulations that push the boundaries of natural skincare.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We build our formulas on nature's most precious raw materials, refined with modern technologies to guarantee the best results for your skin. Each product undergoes rigorous testing to ensure safety, efficacy, and sensorial delight.
              </p>
              {/* <Link 
                to="/shop" 
                className="inline-flex items-center border border-black px-8 py-4 hover:bg-black hover:text-white transition-all"
              >
                <span className="mr-4">Explore Our Technologies</span>
                <FaArrowRight />
              </Link> */}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-[#F8F7F5]">
        <div className="container mx-auto px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span variants={fadeInUp} className="block text-3xl font-light italic mb-8">
              "Our formulations are rooted in nature's most valuable raw materials, enhanced with modern technologies to ensure optimal results for your skin."
            </motion.span>
            <motion.div variants={fadeInUp} className="flex justify-center">
              <div className="w-20 h-1 bg-black"></div>
            </motion.div>
            <motion.p variants={fadeInUp} className="mt-6 text-gray-600 uppercase tracking-widest">
              Dr. Sarah Chen, Head of Research & Development
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="uppercase tracking-widest text-gray-500 mb-4 block">
              Our Team
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl font-light mb-6">
              The Faces Behind Skyn Beauty
            </motion.h2>
            <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-gray-600 text-lg">
              Our passionate team combines expertise in botany, dermatology, and cosmetic chemistry to create products that deliver real results.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <div className="aspect-square overflow-hidden mb-6">
                <img 
                  src={teamImg1} 
                  alt="Team Member" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-medium mb-1">Emma Johnson</h3>
              <p className="text-gray-500 mb-4">Founder & CEO</p>
              <p className="text-gray-600 max-w-sm mx-auto">
                With over 15 years in the beauty industry, Emma's vision drives our commitment to exceptional skincare.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="aspect-square overflow-hidden mb-6">
                <img 
                  src={teamImg2} 
                  alt="Team Member" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-medium mb-1">Dr. Sarah Chen</h3>
              <p className="text-gray-500 mb-4">Head of Research</p>
              <p className="text-gray-600 max-w-sm mx-auto">
                A PhD in Biochemistry, Sarah leads our research team in developing innovative formulations.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="text-center">
              <div className="aspect-square overflow-hidden mb-6">
                <img 
                  src={teamImg3} 
                  alt="Team Member" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-medium mb-1">Michael Nguyen</h3>
              <p className="text-gray-500 mb-4">Sustainability Director</p>
              <p className="text-gray-600 max-w-sm mx-auto">
                Michael ensures our practices and ingredients meet the highest standards of environmental responsibility.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-cover bg-center" style={{ backgroundImage: `url(${aboutImg3})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 container mx-auto px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="max-w-2xl mx-auto text-center text-white"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-light mb-6">
              Experience the Difference
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg mb-8">
              Join thousands of satisfied customers who have transformed their skin with our natural, science-backed products.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link 
                to="/shop" 
                className="inline-flex items-center bg-white text-black px-10 py-4 hover:bg-opacity-90 transition-all"
              >
                <span className="mr-4">Shop Collection</span>
                <FaArrowRight />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;