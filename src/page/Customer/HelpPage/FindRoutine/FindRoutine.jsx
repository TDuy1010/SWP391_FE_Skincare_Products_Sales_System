import { motion } from 'framer-motion';
import { useState } from 'react';
import { questions, routineSteps } from './FindRoutineData';

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

const FindRoutine = () => {
  const [answers, setAnswers] = useState({
    skinType: '',
    concerns: [],
    age: '',
    routine: ''
  });

  const [showResult, setShowResult] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleAnswer = (questionId, answer) => {
    if (questionId === 'concerns') {
      setAnswers(prev => {
        const currentConcerns = prev.concerns || [];
        const newConcerns = currentConcerns.includes(answer)
          ? currentConcerns.filter(a => a !== answer)
          : [...currentConcerns, answer];
        
        return {
          ...prev,
          concerns: newConcerns
        };
      });
    } else {
      setAnswers(prev => ({
        ...prev,
        [questionId]: answer
      }));
      
      // Chỉ chuyển sang bước tiếp theo nếu không phải câu hỏi về mối quan tâm (cho phép chọn nhiều)
      if (questionId !== 'concerns' && currentStep < Object.keys(questions).length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleSeeResult = () => {
    setShowResult(true);
  };

  const getRoutineSteps = () => {
    return routineSteps[answers.routine] || [];
  };

  const isStepComplete = (stepNumber) => {
    const questionId = Object.keys(answers)[stepNumber - 1];
    if (questionId === 'concerns') {
      return answers.concerns.length > 0;
    }
    return answers[questionId] !== '';
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep < Object.keys(questions).length && isStepComplete(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="bg-white rounded-lg overflow-hidden border border-gray-200"
    >
      {!showResult ? (
        <div>
          {/* Thanh Tiến Độ */}
          <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-light">Tìm Quy Trình Chăm Sóc Da Hoàn Hảo</h2>
              <span className="text-sm text-gray-500">Bước {currentStep} / {Object.keys(questions).length}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-black transition-all duration-300"
                style={{ width: `${(currentStep / Object.keys(questions).length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Câu Hỏi Hiện Tại */}
          <div className="p-8">
            {Object.entries(questions).map(([questionNumber, question]) => {
              const questionId = Object.keys(answers)[questionNumber - 1];
              
              if (parseInt(questionNumber) !== currentStep) return null;
              
              return (
                <motion.div
                  key={questionNumber}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-light mb-2">{question.title}</h2>
                  <p className="text-gray-600 mb-8">
                    {question.multiple ? "Bạn có thể chọn nhiều lựa chọn" : "Vui lòng chọn một lựa chọn"}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    {question.options.map((option) => (
                      <motion.button
                        key={option.id}
                        onClick={() => handleAnswer(questionId, option.id)}
                        className={`
                          p-6 rounded-xl transition-all duration-200 border-2
                          ${questionId === 'concerns'
                            ? (answers.concerns.includes(option.id)
                              ? 'bg-black text-white border-black shadow-md'
                              : 'bg-white border-gray-200 hover:border-gray-400')
                            : (answers[questionId] === option.id
                              ? 'bg-black text-white border-black shadow-md'
                              : 'bg-white border-gray-200 hover:border-gray-400')
                          }
                        `}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-lg font-medium mb-1">{option.label}</span>
                          {option.description && (
                            <span className="text-sm text-center">
                              {option.description}
                            </span>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
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
                    
                    {currentStep < Object.keys(questions).length ? (
                      <button
                        onClick={handleNext}
                        disabled={!isStepComplete(currentStep)}
                        className={`
                          px-6 py-3 rounded-lg
                          ${!isStepComplete(currentStep)
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-black text-white hover:bg-gray-800'}
                        `}
                      >
                        Tiếp Theo
                      </button>
                    ) : (
                      <button
                        onClick={handleSeeResult}
                        disabled={!Object.values(answers).every(answer => 
                          Array.isArray(answer) ? answer.length > 0 : answer !== ''
                        )}
                        className={`
                          px-8 py-3 rounded-lg
                          ${!Object.values(answers).every(answer => 
                            Array.isArray(answer) ? answer.length > 0 : answer !== ''
                          )
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-black text-white hover:bg-gray-800'}
                        `}
                      >
                        Xem Quy Trình
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
          className="p-8"
        >
          <h2 className="text-3xl font-light mb-8 text-center">Quy Trình Chăm Sóc Da Cá Nhân Hóa</h2>
          
          <div className="mb-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-xl font-medium mb-4">Thông Tin Của Bạn</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="font-medium w-32">Loại Da:</span> 
                <span className="bg-gray-100 px-4 py-1 rounded-full">
                  {questions[1].options.find(opt => opt.id === answers.skinType)?.label}
                </span>
              </li>
              <li className="flex items-center flex-wrap">
                <span className="font-medium w-32">Vấn Đề Da:</span> 
                <div className="flex flex-wrap gap-2">
                  {answers.concerns.map(c => (
                    <span key={c} className="bg-gray-100 px-4 py-1 rounded-full">
                      {questions[2].options.find(opt => opt.id === c)?.label}
                    </span>
                  ))}
                </div>
              </li>
              <li className="flex items-center">
                <span className="font-medium w-32">Độ Tuổi:</span> 
                <span className="bg-gray-100 px-4 py-1 rounded-full">
                  {questions[3].options.find(opt => opt.id === answers.age)?.label}
                </span>
              </li>
              <li className="flex items-center">
                <span className="font-medium w-32">Loại Quy Trình:</span> 
                <span className="bg-gray-100 px-4 py-1 rounded-full">
                  {questions[4].options.find(opt => opt.id === answers.routine)?.label}
                </span>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-medium mb-6">Các Bước Được Đề Xuất</h3>
          <div className="space-y-4 mb-12">
            {getRoutineSteps().map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 border rounded-lg bg-white hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-semibold shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2">{step.name}</h4>
                    <p className="text-gray-600 mb-3">{step.description}</p>
                    {step.product && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-md">
                        <p className="text-sm font-medium">Sản Phẩm Được Đề Xuất:</p>
                        <p className="text-sm text-gray-600">{step.product}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <motion.button
              onClick={() => {
                setShowResult(false);
                setCurrentStep(1);
                setAnswers({
                  skinType: '',
                  concerns: [],
                  age: '',
                  routine: ''
                });
              }}
              className="px-8 py-3 rounded-lg border-2 border-black hover:bg-black hover:text-white transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Làm Lại Bài Kiểm Tra
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FindRoutine;