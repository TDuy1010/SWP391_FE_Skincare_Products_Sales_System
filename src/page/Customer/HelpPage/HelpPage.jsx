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
  const [selectedTopic, setSelectedTopic] = useState(null);
  const toolsRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGetStarted = () => {
    // Scroll đến phần công cụ chăm sóc da
    toolsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const topics = [
    { 
      icon: <FaSearch className="text-[#34825B] text-2xl" />, 
      title: "Xác định loại da của bạn", 
      id: "determine",
      description: "Trả lời một vài câu hỏi để khám phá loại da của bạn và nhận được những khuyến nghị cá nhân hóa."
    },
    { 
      icon: <FaSeedling className="text-[#34825B] text-2xl" />, 
      title: "Tìm quy trình chăm sóc da", 
      id: "findRoutine",
      description: "Tạo một quy trình chăm sóc da tùy chỉnh dựa trên nhu cầu và vấn đề da riêng của bạn."
    },
  ];

  const TopicItem = ({ topic, isSelected, onClick }) => (
    <motion.div
      className={`
        border-2 rounded-xl p-6 cursor-pointer transition-all
        ${isSelected ? 'border-[#34825B] bg-gray-50 shadow-md' : 'border-gray-200 hover:border-gray-400'}
      `}
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3 mb-3">
        <span>{topic.icon}</span>
        <h3 className={`text-lg ${isSelected ? 'font-medium' : ''}`}>{topic.title}</h3>
      </div>
      <p className="text-gray-600 text-sm pl-9">{topic.description}</p>
    </motion.div>
  );

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
          <h2 className="text-4xl font-light mb-6">Tìm Giải Pháp Chăm Sóc Da Hoàn Hảo</h2>
          <p className="text-gray-600 text-lg">
            Mỗi làn da đều độc đáo và cần được chăm sóc riêng biệt. Các công cụ tương tác của chúng tôi giúp bạn hiểu rõ hơn về làn da của mình và phát triển quy trình phù hợp.
          </p>
        </motion.div>

        {/* Lựa chọn chủ đề */}
        <motion.div 
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {topics.map((topic, index) => (
            <TopicItem
              key={index}
              topic={topic}
              isSelected={selectedTopic === topic.id}
              onClick={() => setSelectedTopic(topic.id)}
            />
          ))}
        </motion.div>

        {/* Phần nội dung */}
        <motion.div variants={fadeInUp}>
          {selectedTopic === 'findRoutine' ? (
            <FindRoutine />
          ) : selectedTopic === 'determine' ? (
            <Determine />
          ) : (
            <div className="text-center text-gray-500 py-24 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
              <div className="max-w-md mx-auto">
                <FaRegLightbulb className="text-5xl mx-auto mb-6 text-[#34825B]" />
                <h3 className="text-2xl font-light mb-4">Chọn Một Công Cụ Để Bắt Đầu</h3>
                <p className="text-gray-600 mb-6">
                  Chọn một trong các lựa chọn bên trên để bắt đầu hành trình chăm sóc da cá nhân hóa của bạn. Các công cụ tương tác của chúng tôi sẽ hướng dẫn bạn từng bước.
                </p>
                <div className="flex justify-center space-x-10">
                  <div 
                    onClick={() => setSelectedTopic('determine')}
                    className="flex flex-col items-center text-[#34825B] cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <FaSearch className="text-3xl mb-2" />
                    <span className="text-sm">Loại Da</span>
                  </div>
                  <div 
                    onClick={() => setSelectedTopic('findRoutine')}
                    className="flex flex-col items-center text-[#34825B] cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <FaSeedling className="text-3xl mb-2" />
                    <span className="text-sm">Quy Trình Da</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HelpPage;