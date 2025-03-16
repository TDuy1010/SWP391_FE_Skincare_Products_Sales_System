import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Card,
  message,
  Space,
  Divider,
  Select,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { addQuiz } from "../../../service/quiz";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const AddQuiz = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);

      // Prepare data according to API format
      const formattedQuestions = values.questions.map((question) => {
        return {
          title: question.title,
          questionId: Date.now().toString(), // Temporary ID
          answers: question.answers.map((answer) => ({
            answerId:
              Date.now().toString() + Math.random().toString().slice(2, 8), // Temporary ID
            answerText: answer.answerText,
            skinType: answer.skinType || "SENSITIVE_SKIN", // Default is SENSITIVE_SKIN
          })),
        };
      });

      const quizData = {
        title: values.title,
        description: values.description,
        questions: formattedQuestions,
      };

      const response = await addQuiz(quizData);

      if (response.error) {
        message.error(response.message || "Failed to add quiz");
      } else {
        message.success("Quiz added successfully");
        form.resetFields();
        navigate("/admin/quiz"); // Navigate to quiz list page
      }
    } catch (error) {
      message.error("An error occurred while adding the quiz");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Add New Quiz" bordered={false}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          questions: [{ answers: [{}] }],
        }}
      >
        <Form.Item
          name="title"
          label="Quiz Title"
          rules={[{ required: true, message: "Please enter quiz title" }]}
        >
          <Input placeholder="Enter quiz title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter quiz description" }]}
        >
          <TextArea rows={4} placeholder="Enter quiz description" />
        </Form.Item>

        <Divider orientation="left">Questions</Divider>

        <Form.List name="questions">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Card
                  key={key}
                  title={`Question ${name + 1}`}
                  style={{ marginBottom: 16 }}
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
                    label="Question Content"
                    rules={[
                      {
                        required: true,
                        message: "Please enter question content",
                      },
                    ]}
                  >
                    <Input placeholder="Enter question content" />
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
                            <Card
                              key={answerKey}
                              size="small"
                              style={{ marginBottom: 16 }}
                              extra={
                                answerFields.length > 1 ? (
                                  <Button
                                    danger
                                    size="small"
                                    icon={<DeleteOutlined />}
                                    onClick={() => removeAnswer(answerName)}
                                  >
                                    Remove
                                  </Button>
                                ) : null
                              }
                            >
                              <Form.Item
                                {...restAnswerField}
                                name={[answerName, "answerText"]}
                                label="Answer Content"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter answer content",
                                  },
                                ]}
                              >
                                <Input placeholder="Enter answer content" />
                              </Form.Item>

                              <Form.Item
                                {...restAnswerField}
                                name={[answerName, "skinType"]}
                                label="Skin Type"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select skin type",
                                  },
                                ]}
                              >
                                <Select placeholder="Select skin type">
                                  <Select.Option value="SENSITIVE_SKIN">
                                    Sensitive Skin
                                  </Select.Option>
                                  <Select.Option value="DRY_SKIN">
                                    Dry Skin
                                  </Select.Option>
                                  <Select.Option value="COMBINATION_SKIN">
                                    Combination Skin
                                  </Select.Option>
                                  <Select.Option value="OILY_SKIN">
                                    Oily Skin
                                  </Select.Option>
                                  <Select.Option value="NORMAL_SKIN">
                                    Normal Skin
                                  </Select.Option>
                                </Select>
                              </Form.Item>
                            </Card>
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
            <Button type="primary" htmlType="submit" loading={loading}>
              Add Quiz
            </Button>
            <Button onClick={() => navigate("/admin/quiz")}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddQuiz;
