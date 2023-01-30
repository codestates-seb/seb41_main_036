import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://pikcha36.o-r.kr:8080",
  withCredentials: true,
});

axios.interceptors.request.use(
  (config) => {
    const originalRequest = config;
    const accessToken = localStorage.getItem("Authorization");
    axios.defaults.headers.common["Authorization"] = accessToken;
    originalRequest.headers["Authorization"] = accessToken;
    return originalRequest;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (res) {
    return res;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 400 && error.response.data.message === "Token Expired") {
      const originalRequest = config;
      axios.defaults.headers.common["Authorization"] = null;
      const memberId = localStorage.getItem("memberId");
      const { data } = await Axios.get(`/token/refresh/${memberId}`, {
        headers: {
          Authorization: null,
        },
      });
      const accessToken = data.data.accessToken;
      localStorage.setItem("Authorization", `${accessToken}`);
      originalRequest.headers.Authorization = accessToken;
      axios.defaults.headers.common["Authorization"] = accessToken;
      localStorage.setItem("loginStatus", "true");
      return axios(originalRequest);
    }
    if (status === 404 && error.response.data.message === "Token not found") {
      const originalRequest = config;
      axios.defaults.headers.common["Authorization"] = null;
      const memberId = localStorage.getItem("memberId");
      const { data } = await Axios.get(`/token/refresh/${memberId}`, {
        headers: {
          Authorization: null,
        },
      });
      const accessToken = data.data.accessToken;
      localStorage.setItem("Authorization", `${accessToken}`);
      originalRequest.headers.Authorization = accessToken;
      axios.defaults.headers.common["Authorization"] = accessToken;
      localStorage.setItem("loginStatus", "true");
      return axios(originalRequest);
    }
    if (
      status === 400 &&
      error.response.data.message === "RefreshToken Expired"
    ) {
      localStorage.setItem("loginStatus", "false");
      localStorage.removeItem("memberId");
      localStorage.removeItem("Authorization");
      alert("로그인 시간 만료.");
      window.location.replace("/login");
    }
    // if (status === 500 ){
    //   localStorage.setItem("loginStatus", "false")
    //   localStorage.removeItem("memberId")
    //   localStorage.removeItem("Authorization")
    //   // alert("로그인 시간 만료.")
    //   // window.location.replace("/login")
    // }
    return Promise.reject(error);
  }
);

export default axios;
