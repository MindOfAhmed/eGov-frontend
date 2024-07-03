import axios from "axios";

// refresh the access token
const refreshToken = async () => {
  // get refresh token from local storage
  const refresh_token = localStorage.getItem("refresh_token");

  if (refresh_token) {
    try {
      // send request to refresh access token
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/refresh/",
        {
          refresh: refresh_token,
        }
      );
      // store new access token in local storage
      localStorage.setItem("access_token", response.data.access);
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }
};

// set up Axios to refresh tokens on 401 responses
const setupAxiosInterceptors = () => {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // refresh token and retry the original request
        await refreshToken();
        return axios(originalRequest);
      }
      return Promise.reject(error);
    }
  );
};

// initialize the Axios interceptors
setupAxiosInterceptors();
