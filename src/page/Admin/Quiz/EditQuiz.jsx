import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Spin,
  message,
  Space,
  Select,
  Divider,
  Row,
  Col,
} from "antd";
import {
  ArrowLeftOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { getQuizById, updateQuiz } from "../../../service/quiz";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const EditQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [quiz, setQuiz] = useState(null);

  const skinTypes = [
    { value: "SENSITIVE_SKIN", label: "Sensitive Skin" },
    { value: "OILY_SKIN", label: "Oily Skin" },
    { value: "DRY_SKIN", label: "Dry Skin" },
    { value: "NORMAL_SKIN", label: "Normal Skin" },
    { value: "COMBINATION_SKIN", label: "Combination Skin" },
  ];

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        setLoading(true);
        const response = await getQuizById(id);

        if (response && response.code === 200) {
          setQuiz(response.result);

          // Format the data for the form - map id to questionId and answerId
          const formattedQuestions = response.result.questions.map(
            (question) => ({
              title: question.title,
              questionId: question.id, // Changed from question.questionId to question.id
              answers: question.answers.map((answer) => ({
                answerText: answer.answerText,
                skinType: answer.skinType,
                answerId: answer.id, // Changed from answer.answerId to answer.id
              })),
            })
          );

          form.setFieldsValue({
            title: response.result.title,
            description: response.result.description,
            status: response.result.status,
            questions: formattedQuestions,
          });
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
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      setSubmitting(true);

      // Format the values to match the expected API request structure
      const formattedValues = {
        description: values.description,
        title: values.title,
        status: values.status,
        questions: values.questions.map((question) => ({
          title: question.title,
          questionId: question.questionId,
          answers: question.answers.map((answer) => ({
            answerText: answer.answerText,
            skinType: answer.skinType,
            answerId: answer.answerId,
          })),
        })),
      };

      console.log("Submitting data:", JSON.stringify(formattedValues, null, 2));

      const response = await updateQuiz(id, formattedValues);

      if (response && response.code === 200) {
        message.success("Quiz updated successfully");
        navigate(`/admin/quiz`);
      } else {
        message.error(response?.message || "Failed to update quiz");
        console.error("Update failed with response:", response);
      }
    } catch (error) {
      console.error("Error updating quiz:", error);
      message.error("An error occurred while updating the quiz");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Spin size="large" tip="Loading quiz details..." />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(`/admin/quiz/detail/${id}`)}
          className="mr-4"
        >
          Back to Quiz Details
        </Button>
        <Title level={2} className="m-0">
          Edit Quiz
        </Title>
      </div>

      <Card className="shadow-sm">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            status: "ACTIVE",
            questions: [
              { title: "", answers: [{ answerText: "", skinType: "" }] },
            ],
          }}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                name="title"
                label="Quiz Title"
                rules={[{ required: true, message: "Please enter quiz title" }]}
              >
                <Input placeholder="Enter quiz title" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Select
                  style={{ width: "100%" }}
                  dropdownMatchSelectWidth={true}
                >
                  <Option value="ACTIVE">Active</Option>
                  <Option value="INACTIVE">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea
              placeholder="Enter quiz description"
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.Item>

          <Divider orientation="left">Questions</Divider>

          <Form.List name="questions">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card
                    key={key}
                    className="mb-4"
                    title={`Question ${name + 1}`}
                    extra={
                      fields.length > 1 ? (
                        <Button
                          danger
                          icon={<DeleteOutlined />}
                          onClick={() => remove(name)}
                        >
                          Remove
                        </Button>
                      ) : null
                    }
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "title"]}
                      label="Question Text"
                      rules={[
                        {
                          required: true,
                          message: "Please enter question text",
                        },
                      ]}
                    >
                      <Input placeholder="Enter question text" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "questionId"]}
                      hidden
                    >
                      <Input />
                    </Form.Item>

                    <Divider orientation="left">Answers</Divider>

                    <Form.List name={[name, "answers"]}>
                      {(
                        answerFields,
                        { add: addAnswer, remove: removeAnswer }
                      ) => (
                        <>
                          {answerFields.map(
                            ({
                              key: answerKey,
                              name: answerName,
                              ...restAnswerField
                            }) => (
                              <Row key={answerKey} gutter={16} className="mb-2">
                                <Col span={14}>
                                  <Form.Item
                                    {...restAnswerField}
                                    name={[answerName, "answerText"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please enter answer text",
                                      },
                                    ]}
                                    noStyle
                                  >
                                    <Input
                                      placeholder="Enter answer text"
                                      style={{ width: "100%" }}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={8}>
                                  <Form.Item
                                    {...restAnswerField}
                                    name={[answerName, "skinType"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Please select skin type",
                                      },
                                    ]}
                                    noStyle
                                  >
                                    <Select
                                      placeholder="Select skin type"
                                      style={{ width: "100%" }}
                                      dropdownMatchSelectWidth={true}
                                    >
                                      {skinTypes.map((type) => (
                                        <Option
                                          key={type.value}
                                          value={type.value}
                                        >
                                          {type.label}
                                        </Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                </Col>
                                <Col span={2}>
                                  {answerFields.length > 1 && (
                                    <Button
                                      danger
                                      icon={<DeleteOutlined />}
                                      onClick={() => removeAnswer(answerName)}
                                      style={{ width: "100%" }}
                                    />
                                  )}
                                </Col>
                                <Form.Item
                                  {...restAnswerField}
                                  name={[answerName, "answerId"]}
                                  hidden
                                >
                                  <Input />
                                </Form.Item>
                              </Row>
                            )
                          )}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => addAnswer()}
                              icon={<PlusOutlined />}
                              block
                            >
                              Add Answer
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </Card>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    block
                  >
                    Add Question
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={submitting}>
                Update Quiz
              </Button>
              <Button onClick={() => navigate(`/admin/quiz`)}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditQuiz;
