import { instance } from "../instance";

export const getAllQuizzes = async (params) => {
  try {
    // Lấy token từ localStorage
    const token = localStorage.getItem("token");

    const response = await instance.get(`/admin/quizs`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return {
      error: true,
      message: error.response?.message || "Failed to fetch quizzes",
    };
  }
};

export const addQuiz = async (data) => {
  try {
    // Lấy token từ localStorage
    const token = localStorage.getItem("token");

    const response = await instance.post(`/admin/quizs`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return {
      error: true,
      message: error.response?.message || "Failed to add quiz",
    };
  }
};

export const deleteQuiz = async (id) => {
  try {
    // Lấy token từ localStorage
    const token = localStorage.getItem("token");

    const response = await instance.delete(`/admin/quizs/delete-quiz/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return {
      error: true,
      message: error.response?.message || "Failed to add quiz",
    };
  }
};

export const getQuizById = async (id) => {
  try {
    // Lấy token từ localStorage
    const token = localStorage.getItem("token");

    const response = await instance.get(`/admin/quizs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return {
      error: true,
      message: error.response?.message || "Failed to fetch quiz details",
    };
  }
};

export const updateQuiz = async (id, data) => {
  try {
    // Lấy token từ localStorage
    const token = localStorage.getItem("token");

    // Log the exact data being sent to the API
    console.log("Sending to API:", JSON.stringify(data, null, 2));

    const response = await instance.put(`/admin/quizs/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("API Error:", error.response?.data);
    return {
      error: true,
      message: error.response?.message || "Failed to update quiz",
    };
  }
};

export const changeQuizStatus = async (quizId, status) => {
  try {
    // Lấy token từ localStorage
    const token = localStorage.getItem("token");

    const response = await instance.patch(
      `/admin/quizs/change-status/${quizId}?status=${status}`,
      {}, // Empty object as the request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    return {
      error: true,
      message: error.response?.message || "Failed to change quiz status",
    };
  }
};
