import { motion } from 'framer-motion';
import { useState } from 'react';
import { questions } from './FindRoutineData';

const FindRoutine = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    skinType: '',
    concerns: [],
    age: '',
    routine: ''
  });

  const handleAnswer = (questionId, answer) => {
    console.log('Current question multiple:', questions[step].multiple);
    console.log('Current answers:', answers);
    
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
      if (step < Object.keys(questions).length) {
        setStep(prev => prev + 1);
      }
    }
  };

  return (
    <motion.div
      className="h-[calc(100vh-64px)] bg-white overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-1 bg-gray-200 rounded-full">
            <motion.div
              className="h-full bg-black rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${(step / Object.keys(questions).length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="mt-2 text-sm text-gray-500 text-right">
            {step}/{Object.keys(questions).length}
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
          <h2 className="text-3xl font-semibold mb-4">{questions[step].title}</h2>
          <p className="text-gray-600 mb-8">
            {step === 2 ? "Bạn có thể chọn nhiều vấn đề" : "Vui lòng chọn một đáp án"}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {questions[step].options.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => {
                  const currentQuestion = step === 2 ? 'concerns' : Object.keys(answers)[step-1];
                  handleAnswer(currentQuestion, option.id);
                }}
                className={`
                  p-6 rounded-xl transition-all duration-200
                  ${step === 2 
                    ? (answers.concerns.includes(option.id) 
                      ? 'bg-gray-500 text-white border-2 border-black shadow-lg' 
                      : 'bg-white border-2 border-gray-200 hover:border-black')
                    : (answers[Object.keys(answers)[step-1]] === option.id 
                      ? 'bg-black text-white border-2 border-black shadow-lg'
                      : 'bg-white border-2 border-gray-200 hover:border-black')
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center justify-center">
                  {/* Nếu bạn có icon, có thể thêm vào đây */}
                  <span className="text-lg font-medium">{option.label}</span>
                  {step === 2 && answers.concerns.includes(option.id) && (
                    <span className="text-sm mt-2">✓ Đã chọn</span>
                  )}
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
          {questions[step].multiple && (
            <motion.button
              onClick={() => step < Object.keys(questions).length && setStep(prev => prev + 1)}
              className="px-8 py-3 rounded-lg bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-colors ml-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Tiếp tục
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FindRoutine;