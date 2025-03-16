import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  getAllQuizzesUser,
  submitQuizAnswers,
} from "../../../../service/quiz/index";

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

// Skin type descriptions mapping
const skinTypeDescriptions = {
  DRY_SKIN: {
    title: "Da Khô",
    description:
      "Da khô thường thiếu độ ẩm và dầu tự nhiên, dễ bong tróc, khô ráp và đôi khi cảm thấy căng.",
    tips: [
      "Sử dụng sữa rửa mặt dịu nhẹ, không chứa sulfate",
      "Thêm serum cấp ẩm chứa hyaluronic acid vào quy trình chăm sóc",
      "Sử dụng kem dưỡng ẩm đậm đặc",
      "Tránh các sản phẩm chứa cồn",
      "Uống đủ nước mỗi ngày",
    ],
  },
  OILY_SKIN: {
    title: "Da Dầu",
    description:
      "Da dầu sản xuất quá nhiều bã nhờn, thường bóng nhờn, dễ bị mụn và lỗ chân lông to.",
    tips: [
      "Sử dụng sữa rửa mặt có chứa salicylic acid",
      "Dùng toner không cồn để cân bằng độ pH",
      "Chọn kem dưỡng ẩm dạng gel không dầu",
      "Sử dụng mặt nạ đất sét 1-2 lần/tuần",
      "Không bỏ qua bước dưỡng ẩm",
    ],
  },
  COMBINATION_SKIN: {
    title: "Da Hỗn Hợp",
    description:
      "Da hỗn hợp có vùng chữ T (trán, mũi, cằm) dầu nhưng má khô hoặc bình thường.",
    tips: [
      "Sử dụng sản phẩm làm sạch dịu nhẹ",
      "Áp dụng các sản phẩm khác nhau cho các vùng da khác nhau",
      "Dùng toner cân bằng không cồn",
      "Sử dụng mặt nạ đa năng hoặc multi-masking",
      "Chọn kem dưỡng ẩm phù hợp với từng vùng da",
    ],
  },
  NORMAL_SKIN: {
    title: "Da Thường",
    description:
      "Da thường có độ ẩm và dầu cân bằng, ít gặp vấn đề, lỗ chân lông nhỏ và ít nhạy cảm.",
    tips: [
      "Duy trì quy trình chăm sóc da đơn giản",
      "Sử dụng sản phẩm làm sạch dịu nhẹ",
      "Bảo vệ da với kem chống nắng hàng ngày",
      "Tẩy tế bào chết 1-2 lần/tuần",
      "Duy trì chế độ ăn uống cân bằng và uống đủ nước",
    ],
  },
  SENSITIVE_SKIN: {
    title: "Da Nhạy Cảm",
    description:
      "Da nhạy cảm dễ bị kích ứng, đỏ, ngứa hoặc châm chích khi tiếp xúc với một số sản phẩm hoặc yếu tố môi trường.",
    tips: [
      "Sử dụng sản phẩm không hương liệu và hypoallergenic",
      "Tránh các thành phần gây kích ứng như cồn và sulfate",
      "Thử nghiệm sản phẩm mới trên một vùng da nhỏ trước",
      "Chọn kem chống nắng vật lý thay vì hóa học",
      "Tránh tẩy tế bào chết quá mạnh",
    ],
  },
};

const Determine = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [skinTypeResults, setSkinTypeResults] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        const response = await getAllQuizzesUser();
        if (response.error) {
          setError(response.message);
        } else {
          setQuizzes(response.result || []);
          // Mặc định chọn quiz đầu tiên nếu có
          if (response.result && response.result.length > 0) {
            setSelectedQuiz(response.result[0]);
            setCurrentQuestions(response.result[0].questions || []);

            // Khởi tạo đối tượng answers với các câu hỏi từ quiz
            const initialAnswers = {};
            response.result[0].questions.forEach((question) => {
              initialAnswers[question.id] = "";
            });
            setAnswers(initialAnswers);
          }
        }
      } catch (err) {
        setError("Có lỗi xảy ra khi tải dữ liệu bài kiểm tra");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const calculateSkinType = () => {
    // Đếm số lần xuất hiện của mỗi loại da trong các câu trả lời
    const skinTypeCounts = {};

    Object.keys(answers).forEach((questionId) => {
      const answerId = answers[questionId];
      if (answerId) {
        // Tìm câu hỏi trong danh sách câu hỏi
        const question = currentQuestions.find(
          (q) => q.id.toString() === questionId.toString()
        );
        if (question) {
          // Tìm câu trả lời được chọn
          const selectedAnswer = question.answers.find(
            (a) => a.id.toString() === answerId.toString()
          );
          if (selectedAnswer) {
            const skinType = selectedAnswer.skinType;
            skinTypeCounts[skinType] = (skinTypeCounts[skinType] || 0) + 1;
          }
        }
      }
    });

    // Tìm loại da có số lần xuất hiện nhiều nhất
    let maxCount = 0;
    let determinedSkinType = null;

    Object.entries(skinTypeCounts).forEach(([skinType, count]) => {
      if (count > maxCount) {
        maxCount = count;
        determinedSkinType = skinType;
      }
    });

    // Lưu lại kết quả chi tiết để hiển thị nếu cần
    setSkinTypeResults(skinTypeCounts);

    return determinedSkinType;
  };

  const handleAnswer = (questionId, answerId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));

    if (currentStep < currentQuestions.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSeeResult = async () => {
    if (!selectedQuiz) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      // Gọi API để submit câu trả lời
      // Không cần format lại answers vì hàm submitQuizAnswers đã xử lý
      const response = await submitQuizAnswers(selectedQuiz.id, answers);

      if (response.error) {
        setSubmitError(response.message || "Có lỗi xảy ra khi gửi câu trả lời");
        console.error("Submit error:", response);
      } else {
        // Nếu API trả về kết quả loại da, sử dụng kết quả đó
        if (response.data?.skinType) {
          setResult(response.data.skinType);
        } else {
          // Nếu không, tính toán loại da dựa trên câu trả lời
          const skinType = calculateSkinType();
          setResult(skinType);
        }
      }
    } catch (error) {
      setSubmitError("Có lỗi xảy ra khi gửi câu trả lời");
      console.error("Submit error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSelectQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestions(quiz.questions || []);
    setCurrentStep(1);
    setResult(null);

    // Khởi tạo lại đối tượng answers với các câu hỏi từ quiz mới
    const initialAnswers = {};
    quiz.questions.forEach((question) => {
      initialAnswers[question.id] = "";
    });
    setAnswers(initialAnswers);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-lg text-center">
        <h3 className="text-red-600 text-xl mb-2">Đã xảy ra lỗi</h3>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg text-center">
        <h3 className="text-gray-600 text-xl mb-2">Không có bài kiểm tra</h3>
        <p>Hiện tại không có bài kiểm tra loại da nào khả dụng.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="bg-white rounded-lg overflow-hidden border border-gray-200"
    >
      {/* Chọn bài kiểm tra nếu có nhiều hơn 1 */}
      {quizzes.length > 1 && !result && (
        <div className="bg-gray-50 px-8 py-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            {quizzes.map((quiz) => (
              <button
                key={quiz.id}
                onClick={() => handleSelectQuiz(quiz)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedQuiz?.id === quiz.id
                    ? "bg-black text-white"
                    : "bg-white border border-gray-300 hover:border-gray-500"
                }`}
              >
                {quiz.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {!result ? (
        <div>
          {/* Thanh tiến độ */}
          <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-light">
                {selectedQuiz?.title || "Xác Định Loại Da Của Bạn"}
              </h2>
              <span className="text-sm text-gray-500">
                Câu hỏi {currentStep} trong {currentQuestions.length}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-300"
                style={{
                  width: `${(currentStep / currentQuestions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Hiển thị câu hỏi hiện tại */}
          <div className="p-8">
            {currentQuestions.map((question, index) => {
              if (index + 1 !== currentStep) return null;

              return (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-light mb-6">{question.title}</h2>

                  <div className="grid grid-cols-1 gap-4 mb-10">
                    {question.answers.map((option) => (
                      <motion.button
                        key={option.id}
                        onClick={() => handleAnswer(question.id, option.id)}
                        className={`
                          p-6 rounded-xl text-left transition-all duration-200 border-2
                          ${
                            answers[question.id] == option.id
                              ? "border-black"
                              : "border-gray-200 hover:border-gray-400"
                          }
                        `}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center">
                          <div
                            className={`
                            w-5 h-5 rounded-full border-2 mr-4 flex-shrink-0
                            ${
                              answers[question.id] == option.id
                                ? "border-black"
                                : "border-gray-400"
                            }
                          `}
                          >
                            {answers[question.id] == option.id && (
                              <div className="w-full h-full bg-black rounded-full m-auto"></div>
                            )}
                          </div>
                          <span className="text-lg">{option.answerText}</span>
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
                        ${
                          currentStep === 1
                            ? "border-gray-200 text-gray-300 cursor-not-allowed"
                            : "border-gray-800 text-gray-800 hover:bg-gray-100"
                        }
                      `}
                    >
                      Quay Lại
                    </button>

                    {currentStep < currentQuestions.length ? (
                      <button
                        onClick={() =>
                          answers[question.id] &&
                          setCurrentStep(currentStep + 1)
                        }
                        disabled={!answers[question.id]}
                        className={`
                          px-6 py-3 rounded-lg
                          ${
                            !answers[question.id]
                              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                              : "bg-black text-white hover:bg-gray-800"
                          }
                        `}
                      >
                        Tiếp Theo
                      </button>
                    ) : (
                      <button
                        onClick={handleSeeResult}
                        disabled={
                          submitting ||
                          Object.keys(answers).length <
                            currentQuestions.length ||
                          Object.values(answers).some((answer) => !answer)
                        }
                        className={`
                          px-8 py-3 rounded-lg flex items-center
                          ${
                            submitting ||
                            Object.keys(answers).length <
                              currentQuestions.length ||
                            Object.values(answers).some((answer) => !answer)
                              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                              : "bg-black text-white hover:bg-gray-800"
                          }
                        `}
                      >
                        {submitting ? (
                          <>
                            <span className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></span>
                            Đang xử lý...
                          </>
                        ) : (
                          "Xem Kết Quả"
                        )}
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
          <h2 className="text-3xl font-light mb-2 text-center">
            Loại Da Của Bạn
          </h2>
          <h3 className="text-4xl font-semibold mb-8 text-center">
            {skinTypeDescriptions[result]?.title || result}
          </h3>

          <div className="max-w-3xl mx-auto">
            <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-lg leading-relaxed text-gray-700">
                {skinTypeDescriptions[result]?.description ||
                  "Mô tả về loại da của bạn."}
              </p>
            </div>

            <div className="mb-12">
              <h4 className="text-xl font-medium mb-4 flex items-center">
                <span className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Khuyến nghị cho {skinTypeDescriptions[result]?.title || result}
              </h4>
              <div className="space-y-4 pl-12">
                {(
                  skinTypeDescriptions[result]?.tips || [
                    "Chưa có khuyến nghị cụ thể cho loại da này.",
                  ]
                ).map((tip, index) => (
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
                  // Khởi tạo lại đối tượng answers với các câu hỏi từ quiz hiện tại
                  const initialAnswers = {};
                  currentQuestions.forEach((question) => {
                    initialAnswers[question.id] = "";
                  });
                  setAnswers(initialAnswers);
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

      {/* Hiển thị lỗi submit nếu có */}
      {submitError && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg">
          {submitError}
        </div>
      )}
    </motion.div>
  );
};

export default Determine;
