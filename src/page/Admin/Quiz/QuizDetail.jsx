import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Typography,
  Divider,
  Tag,
  Spin,
  Button,
  List,
  Collapse,
  Descriptions,
  Empty,
  message,
} from "antd";
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { getQuizById } from "../../../service/quiz";

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const QuizDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        setLoading(true);
        const response = await getQuizById(id);

        if (response && response.code === 200) {
          setQuiz(response.result);
        } else {
          message.error(response?.message || "Failed to load quiz details");
        }
      } catch (error) {
        console.error("Error fetching quiz details:", error);
        message.error("An error occurred while loading quiz details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchQuizDetails();
    }
  }, [id]);

  const getSkinTypeColor = (skinType) => {
    const colorMap = {
      SENSITIVE_SKIN: "red",
      OILY_SKIN: "green",
      DRY_SKIN: "orange",
      NORMAL_SKIN: "blue",
      COMBINATION_SKIN: "purple",
    };
    return colorMap[skinType] || "default";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Spin size="large" tip="Loading quiz details..." />
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="p-6">
        <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/admin/quiz")}
          className="mb-4"
        >
          Back to Quiz List
        </Button>
        <Empty description="Quiz not found or has been deleted" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/admin/quiz")}
        >
          Back to Quiz List
        </Button>
        <Button
          type="primary"
          onClick={() => navigate(`/admin/quiz/edit/${id}`)}
        >
          Edit Quiz
        </Button>
      </div>

      {/* Quiz Overview */}
      <Card className="mb-6 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <Title level={2}>{quiz.title}</Title>
            <Paragraph className="text-gray-500 mt-2">
              {quiz.description}
            </Paragraph>
          </div>
          <Tag
            color={quiz.status === "ACTIVE" ? "green" : "red"}
            className="text-base px-3 py-1"
          >
            {quiz.status === "ACTIVE" ? (
              <>
                <CheckCircleOutlined /> Active
              </>
            ) : (
              <>
                <CloseCircleOutlined /> Inactive
              </>
            )}
          </Tag>
        </div>
      </Card>

      {/* Questions Section */}
      <Title level={4} className="mb-4 flex items-center">
        <QuestionCircleOutlined className="mr-2" /> Questions
      </Title>
      {quiz.questions && quiz.questions.length > 0 ? (
        <Collapse className="mb-6 shadow-sm">
          {quiz.questions.map((question, index) => (
            <Panel
              header={
                <span className="font-medium">
                  Question {index + 1}: {question.title}
                </span>
              }
              key={question.id}
            >
              <List
                dataSource={question.answers || []}
                renderItem={(answer) => (
                  <List.Item>
                    <List.Item.Meta
                      title={answer.answerText}
                      description={
                        <Tag color={getSkinTypeColor(answer.skinType)}>
                          {answer.skinType.replace("_", " ")}
                        </Tag>
                      }
                    />
                  </List.Item>
                )}
                locale={{ emptyText: "No answers available for this question" }}
              />
            </Panel>
          ))}
        </Collapse>
      ) : (
        <Empty description="No questions available" className="mb-6" />
      )}
    </div>
  );
};

export default QuizDetail;
