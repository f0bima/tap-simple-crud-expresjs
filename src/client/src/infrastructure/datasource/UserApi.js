import axios from "axios";
// const baseUrl = "http://localhost:8080";
const baseUrl = "/api/users";

export const userApi = axios.create({
  baseURL: `${baseUrl}`,
  timeout: 5000,
});

userApi.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

userApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorData = "";

    if (error.response) {
      console.error("Error response:", error.response.data);
      const errorResponse = error?.response?.data;
      errorData =
        errorResponse.error || errorResponse.message || "Unknown Error";
    } else if (error.request) {
      console.error("No response received:", error.request);
      errorData = error.request;
    } else {
      console.error("Axios error:", error.message);
      errorData = error.message;
    }

    return Promise.reject({
      ...error,
      errorData,
    });
  }
);
