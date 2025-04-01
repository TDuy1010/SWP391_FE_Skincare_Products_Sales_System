/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import FindRoutine from './FindRoutine/FindRoutine';
import Determine from './Determine/Determine';
import helpHeroImage from '../../../assets/img/hero-photo.png';
import { 
  FaSearch, 
  FaSeedling, 
  FaChevronRight, 
  FaRegLightbulb, 
  FaRegSmile
} from 'react-icons/fa';

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

const HelpPage = () => {
  const [selectedTopic, setSelectedTopic] = useState('determine');
  const toolsRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGetStarted = () => {
    toolsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Chính */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={helpHeroImage} 
            alt="Hướng Dẫn Chăm Sóc Da" 
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
              <h1 className="text-5xl font-light mb-6">Hướng Dẫn Chăm Sóc Da</h1>
              <p className="text-xl mb-8 leading-relaxed">
                Khám phá quy trình chăm sóc da hoàn hảo với các công cụ cá nhân hóa và khuyến nghị từ chuyên gia của chúng tôi.
              </p>
              <motion.button
                onClick={handleGetStarted}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center bg-white text-black px-8 py-4 rounded-md transition-all hover:bg-opacity-90"
              >
                <span className="mr-4">Bắt Đầu Ngay</span>
                <FaChevronRight />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.div 
        ref={toolsRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-8 py-16"
      >
        <motion.div variants={fadeInUp} className="mb-12 text-center max-w-3xl mx-auto">
          <span className="uppercase tracking-widest text-[#34825B] mb-4 block">
            Hướng Dẫn Cá Nhân Hóa
          </span>
          <h2 className="text-4xl font-light mb-6">Xác Định Loại Da Của Bạn</h2>
          <p className="text-gray-600 text-lg">
            Hãy cùng tìm hiểu về làn da của bạn thông qua bộ câu hỏi đơn giản dưới đây để nhận được những gợi ý chăm sóc da phù hợp nhất.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Determine />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HelpPage;