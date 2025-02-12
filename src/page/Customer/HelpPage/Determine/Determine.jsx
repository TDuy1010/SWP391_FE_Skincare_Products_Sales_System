import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skinTypeQuestions, skinTypeDescriptions } from './DetermineData';

const Determine = () => {
  const [step, setStep] = useState(1);
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
    if (step < Object.keys(skinTypeQuestions).length) {
      setStep(prev => prev + 1);
    }
  };

  const handleSeeResult = () => {
    const skinType = calculateSkinType();
    setResult(skinType);
  };

  return (
    <motion.div
      className="min-h-[calc(100vh-64px)] bg-white overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto px-4 py-12">
        {!result ? (
          <>
            <h1 className="text-3xl font-semibold mb-8 text-center">Xác định loại da của bạn</h1>
            
            {/* Hiển thị tất cả câu hỏi */}
            {Object.entries(skinTypeQuestions).map(([questionNumber, question]) => {
              const questionKey = Object.keys(answers)[questionNumber - 1];
              
              return (
                <motion.div
                  key={questionNumber}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-12 p-6 border rounded-xl"
                >
                  <h2 className="text-xl font-semibold mb-4">Câu {questionNumber}: {question.title}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {question.options.map((option) => (
                      <motion.button
                        key={option.id}
                        onClick={() => handleAnswer(questionKey, option.id)}
                        className={`
                          p-4 rounded-xl transition-all duration-200
                          ${answers[questionKey] === option.id 
                            ? 'bg-black text-white border-2 border-black shadow-lg' 
                            : 'bg-white border-2 border-gray-200 hover:border-black'}
                        `}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-lg font-medium">{option.label}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            {/* Nút xem kết quả */}
            <div className="text-center mt-8">
              <motion.button
                onClick={handleSeeResult}
                disabled={Object.values(answers).some(answer => answer === '')}
                className={`
                  px-8 py-3 rounded-lg border-2 border-black
                  ${Object.values(answers).some(answer => answer === '')
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-white hover:text-black transition-colors'}
                `}
                whileHover={{ scale: Object.values(answers).some(answer => answer === '') ? 1 : 1.02 }}
                whileTap={{ scale: Object.values(answers).some(answer => answer === '') ? 1 : 0.98 }}
              >
                Xem kết quả
              </motion.button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6">{skinTypeDescriptions[result].title}</h2>
            <p className="text-lg text-gray-600 mb-8">{skinTypeDescriptions[result].description}</p>
            
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <h3 className="text-xl font-semibold mb-4">Lời khuyên cho bạn:</h3>
              <ul className="text-left">
                {skinTypeDescriptions[result].tips.map((tip, index) => (
                  <li key={index} className="mb-2 flex items-start">
                    <span className="mr-2">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <motion.button
              onClick={() => {
                setStep(1);
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
              Làm lại bài test
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Determine;