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
      className="h-[calc(100vh-64px)] bg-white overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto px-4 py-12">
        {!result ? (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="h-1 bg-gray-200 rounded-full">
                <motion.div
                  className="h-full bg-black rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(step / Object.keys(skinTypeQuestions).length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="mt-2 text-sm text-gray-500 text-right">
                {step}/{Object.keys(skinTypeQuestions).length}
              </div>
            </div>

            {/* Question Section */}
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-3xl font-semibold mb-4">{skinTypeQuestions[step].title}</h2>
              <p className="text-gray-600 mb-8">Vui lòng chọn một đáp án</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {skinTypeQuestions[step].options.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => {
                      const currentQuestion = Object.keys(answers)[step-1];
                      handleAnswer(currentQuestion, option.id);
                    }}
                    className={`
                      p-6 rounded-xl transition-all duration-200
                      ${answers[Object.keys(answers)[step-1]] === option.id 
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

            {/* Navigation Buttons */}
            <div className="mt-12 flex justify-between max-w-2xl mx-auto">
              {step > 1 && (
                <motion.button
                  onClick={() => setStep(prev => prev - 1)}
                  className="px-8 py-3 rounded-lg border-2 border-black hover:bg-black hover:text-white transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Quay lại
                </motion.button>
              )}
              {step === Object.keys(skinTypeQuestions).length && (
                <motion.button
                  onClick={handleSeeResult}
                  className="px-8 py-3 rounded-lg bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-colors ml-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Xem kết quả
                </motion.button>
              )}
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