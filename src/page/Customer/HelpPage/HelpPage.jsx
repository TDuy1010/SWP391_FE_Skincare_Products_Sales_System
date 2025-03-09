/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const topics = [
    { 
      icon: <FaSearch className="text-[#34825B] text-2xl" />, 
      title: "Determine your skin type", 
      id: "determine",
      description: "Answer a few questions to discover your skin type and get personalized recommendations."
    },
    { 
      icon: <FaSeedling className="text-[#34825B] text-2xl" />, 
      title: "Find your skin care routine", 
      id: "findRoutine",
      description: "Create a customized skincare regimen based on your unique skin needs and concerns."
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
      {/* Hero Banner */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={helpHeroImage} 
            alt="Skincare Help" 
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
              <h1 className="text-5xl font-light mb-6">Skin Care Guidance</h1>
              <p className="text-xl mb-8 leading-relaxed">
                Discover your perfect skincare routine with our personalized tools and expert recommendations.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center bg-white text-black px-8 py-4 rounded-md transition-all hover:bg-opacity-90"
              >
                <span className="mr-4">Get Started</span>
                <FaChevronRight />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-8 py-16"
      >
        <motion.div variants={fadeInUp} className="mb-12 text-center max-w-3xl mx-auto">
          <span className="uppercase tracking-widest text-[#34825B] mb-4 block">
            Personalized Guidance
          </span>
          <h2 className="text-4xl font-light mb-6">Find Your Perfect Skincare Solution</h2>
          <p className="text-gray-600 text-lg">
            Every skin is unique and requires personalized care. Our interactive tools help you understand your skin better and develop a routine that works for you.
          </p>
        </motion.div>

        {/* Topic Selection */}
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

        {/* Content Section */}
        <motion.div variants={fadeInUp}>
          {selectedTopic === 'findRoutine' ? (
            <FindRoutine />
          ) : selectedTopic === 'determine' ? (
            <Determine />
          ) : (
            <div className="text-center text-gray-500 py-24 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
              <div className="max-w-md mx-auto">
                <FaRegLightbulb className="text-5xl mx-auto mb-6 text-[#34825B]" />
                <h3 className="text-2xl font-light mb-4">Select a Tool to Begin</h3>
                <p className="text-gray-600 mb-6">
                  Choose one of the options above to start your personalized skincare journey. Our interactive tools will guide you step-by-step.
                </p>
                <div className="flex justify-center space-x-10">
                  <div className="flex flex-col items-center text-[#34825B]">
                    <FaSearch className="text-3xl mb-2" />
                    <span className="text-sm">Skin Type</span>
                  </div>
                  <div className="flex flex-col items-center text-[#34825B]">
                    <FaSeedling className="text-3xl mb-2" />
                    <span className="text-sm">Skin Routine</span>
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