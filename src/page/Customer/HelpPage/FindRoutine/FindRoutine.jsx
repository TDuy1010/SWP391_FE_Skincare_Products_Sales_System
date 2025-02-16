import { motion } from 'framer-motion';
import { useState } from 'react';
import { questions, routineSteps } from './FindRoutineData';

const FindRoutine = () => {
  const [answers, setAnswers] = useState({
    skinType: '',
    concerns: [],
    age: '',
    routine: ''
  });

  const [showResult, setShowResult] = useState(false);

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
    }
  };

  const handleSeeResult = () => {
    setShowResult(true);
  };

  const getRoutineSteps = () => {
    return routineSteps[answers.routine] || [];
  };

  return (
    <motion.div
      className="min-h-[calc(100vh-64px)] bg-white overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto px-4 py-12">
        {!showResult ? (
          <>
            <h1 className="text-3xl font-semibold mb-8 text-center">Find Your Perfect Skincare Routine</h1>

            {Object.entries(questions).map(([questionNumber, question]) => {
              const questionId = Object.keys(answers)[questionNumber - 1];
              
              return (
                <motion.div
                  key={questionNumber}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-12 p-6 border rounded-xl"
                >
                  <h2 className="text-2xl font-semibold mb-4">{question.title}</h2>
                  <p className="text-gray-600 mb-6">
                    {question.multiple ? "You can select multiple options" : "Please select one option"}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {question.options.map((option) => (
                      <motion.button
                        key={option.id}
                        onClick={() => handleAnswer(questionId, option.id)}
                        className={`
                          p-6 rounded-xl transition-all duration-200
                          ${questionId === 'concerns'
                            ? (answers.concerns.includes(option.id)
                              ? 'bg-gray-500 text-white border-2 border-black shadow-lg'
                              : 'bg-white border-2 border-gray-200 hover:border-black')
                            : (answers[questionId] === option.id
                              ? 'bg-black text-white border-2 border-black shadow-lg'
                              : 'bg-white border-2 border-gray-200 hover:border-black')
                          }
                        `}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-lg font-medium">{option.label}</span>
                          {questionId === 'concerns' && answers.concerns.includes(option.id) && (
                            <span className="text-sm mt-2">✓ Selected</span>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            <div className="text-center mt-8">
              <motion.button
                onClick={handleSeeResult}
                disabled={!Object.values(answers).every(answer => 
                  Array.isArray(answer) ? answer.length > 0 : answer !== ''
                )}
                className={`
                  px-8 py-3 rounded-lg border-2 border-black
                  ${!Object.values(answers).every(answer => 
                    Array.isArray(answer) ? answer.length > 0 : answer !== ''
                  )
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-white hover:text-black transition-colors'}
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                See Results
              </motion.button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-semibold mb-8 text-center">Recommended Skincare Routine</h2>
            
            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Your Information:</h3>
              <ul className="space-y-2">
                <li><span className="font-medium">Skin Type:</span> {questions[1].options.find(opt => opt.id === answers.skinType)?.label}</li>
                <li>
                  <span className="font-medium">Skin Concerns:</span>{' '}
                  {answers.concerns.map(c => questions[2].options.find(opt => opt.id === c)?.label).join(', ')}
                </li>
                <li><span className="font-medium">Age:</span> {questions[3].options.find(opt => opt.id === answers.age)?.label}</li>
                <li><span className="font-medium">Routine Type:</span> {questions[4].options.find(opt => opt.id === answers.routine)?.label}</li>
              </ul>
            </div>

            <div className="space-y-4">
              {getRoutineSteps().map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-4 border rounded-lg bg-white"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-semibold">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-semibold">{step.name}</h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <motion.button
                onClick={() => {
                  setShowResult(false);
                  setAnswers({
                    skinType: '',
                    concerns: [],
                    age: '',
                    routine: ''
                  });
                }}
                className="px-8 py-3 rounded-lg border-2 border-black bg-black text-white hover:bg-white hover:text-black transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Take Test Again
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FindRoutine;