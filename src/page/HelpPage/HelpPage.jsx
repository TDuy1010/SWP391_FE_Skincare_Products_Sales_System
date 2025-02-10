import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import FindRoutine from './FindRoutine/FindRoutine';
import Determine from './Determine/Determine';

const HelpPage = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const topics = [
    { icon: "🔍", title: "Determine your skin type", id: "determine" },
    { icon: "🌱", title: "Find your skin care routine", id: "findRoutine" },
  ];

  const TopicItem = ({ topic, isSelected, onClick }) => (
    <motion.div
      className={`
        flex items-center space-x-3 cursor-pointer 
        hover:text-gray-600 transition-colors
        ${isSelected ? 'text-black font-medium' : 'text-gray-600'}
      `}
      whileHover={{ x: 5 }}
      onClick={onClick}
    >
      <span className="text-lg">{topic.icon}</span>
      <span className="text-sm">{topic.title}</span>
    </motion.div>
  );

  return (
    <motion.div 
      className="min-h-[calc(100vh-64px-80px)] bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-normal mb-4">Topics</h2>
            <div className="space-y-3">
              {topics.map((topic, index) => (
                <TopicItem
                  key={index}
                  topic={topic}
                  isSelected={selectedTopic === topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                />
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="md:col-span-2">
            {selectedTopic === 'findRoutine' ? (
              <FindRoutine />
            ) : selectedTopic === 'determine' ? (
              <Determine />
            ) : (
              <div className="text-center text-gray-500 mt-8">
                Please select a topic from the left menu
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HelpPage;