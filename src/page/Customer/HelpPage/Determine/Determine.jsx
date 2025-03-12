import { useState } from 'react';
import { motion } from 'framer-motion';
import { skinTypeQuestions, skinTypeDescriptions } from './DetermineData';

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

const Determine = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    afterCleansing: '',
    midDay: '',
    poreSize: '',
    tendency: ''
  });
  const [result, setResult] = useState(null);

  const calculateSkinType = () => {
    const points = {
      dry: 0,
      normal: 0,
      oily: 0,
      combination: 0
    };

    // Tính điểm cho từng loại da dựa trên câu trả lời
    Object.keys(answers).forEach((questionKey, index) => {
      const questionNumber = index + 1;
      const answer = answers[questionKey];
      const option = skinTypeQuestions[questionNumber].options.find(opt => opt.id === answer);
      
      if (option) {
        Object.keys(points).forEach(skinType => {
          points[skinType] += option.points[skinType];
        });
      }
    });

    // Xác định loại da có điểm cao nhất
    const skinType = Object.entries(points).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    return skinType;
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    if (currentStep < Object.keys(skinTypeQuestions).length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSeeResult = () => {
    const skinType = calculateSkinType();
    setResult(skinType);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const totalQuestions = Object.keys(skinTypeQuestions).length;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="bg-white rounded-lg overflow-hidden border border-gray-200"
    >
      {!result ? (
        <div>
          {/* Thanh tiến độ */}
          <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-light">Xác Định Loại Da Của Bạn</h2>
              <span className="text-sm text-gray-500">Câu hỏi {currentStep} trong {totalQuestions}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-black transition-all duration-300"
                style={{ width: `${(currentStep / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Hiển thị câu hỏi hiện tại */}
          <div className="p-8">
            {Object.entries(skinTypeQuestions).map(([questionNumber, question]) => {
              const questionKey = Object.keys(answers)[questionNumber - 1];
              
              if (parseInt(questionNumber) !== currentStep) return null;
              
              return (
                <motion.div
                  key={questionNumber}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-light mb-6">{question.title}</h2>
                  
                  <div className="grid grid-cols-1 gap-4 mb-10">
                    {question.options.map((option) => (
                      <motion.button
                        key={option.id}
                        onClick={() => handleAnswer(questionKey, option.id)}
                        className={`
                          p-6 rounded-xl text-left transition-all duration-200 border-2
                          ${answers[questionKey] === option.id 
                            ? 'bg-black text-white border-black shadow-md' 
                            : 'bg-white border-gray-200 hover:border-gray-400'}
                        `}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center">
                          <div className={`
                            w-5 h-5 rounded-full border-2 mr-4 flex-shrink-0
                            ${answers[questionKey] === option.id
                              ? 'border-white bg-white'
                              : 'border-gray-400'}
                          `}>
                            {answers[questionKey] === option.id && (
                              <div className="w-2 h-2 bg-black rounded-full m-auto"></div>
                            )}
                          </div>
                          <span className="text-lg">{option.label}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <button
                      onClick={handleBack}
                      disabled={currentStep === 1}
                      className={`
                        px-6 py-3 rounded-lg border 
                        ${currentStep === 1 
                          ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                          : 'border-gray-800 text-gray-800 hover:bg-gray-100'}
                      `}
                    >
                      Quay Lại
                    </button>
                    
                    {currentStep < totalQuestions ? (
                      <button
                        onClick={() => answers[questionKey] !== '' && setCurrentStep(currentStep + 1)}
                        disabled={answers[questionKey] === ''}
                        className={`
                          px-6 py-3 rounded-lg
                          ${answers[questionKey] === ''
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-black text-white hover:bg-gray-800'}
                        `}
                      >
                        Tiếp Theo
                      </button>
                    ) : (
                      <button
                        onClick={handleSeeResult}
                        disabled={Object.values(answers).some(answer => answer === '')}
                        className={`
                          px-8 py-3 rounded-lg
                          ${Object.values(answers).some(answer => answer === '')
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-black text-white hover:bg-gray-800'}
                        `}
                      >
                        Xem Kết Quả
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-10"
        >
          <h2 className="text-3xl font-light mb-2 text-center">Loại Da Của Bạn</h2>
          <h3 className="text-4xl font-semibold mb-8 text-center">{skinTypeDescriptions[result].title}</h3>
          
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-lg leading-relaxed text-gray-700">{skinTypeDescriptions[result].description}</p>
            </div>
            
            <div className="mb-12">
              <h4 className="text-xl font-medium mb-4 flex items-center">
                <span className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </span>
                Khuyến nghị cho {skinTypeDescriptions[result].title}
              </h4>
              <div className="space-y-4 pl-12">
                {skinTypeDescriptions[result].tips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start">
                      <span className="text-black mr-3">•</span>
                      <p>{tip}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <motion.button
                onClick={() => {
                  setCurrentStep(1);
                  setAnswers({
                    afterCleansing: '',
                    midDay: '',
                    poreSize: '',
                    tendency: ''
                  });
                  setResult(null);
                }}
                className="px-8 py-3 rounded-lg border-2 border-black hover:bg-black hover:text-white transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Làm Bài Kiểm Tra Lại
              </motion.button>
              
              <motion.button
                className="px-8 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  // Nếu có tích hợp với công cụ tìm routine, có thể thêm chức năng tìm routine dựa trên skin type ở đây
                  // Ví dụ: navigate to routine finder với kết quả skin type
                }}
              >
                Tìm Sản Phẩm Phù Hợp Với Da Của Bạn
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Determine;