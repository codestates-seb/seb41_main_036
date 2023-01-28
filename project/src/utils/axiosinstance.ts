import Axios, { AxiosHeaders } from "axios";

const axios = Axios.create({
  baseURL: "http://pikcha36.o-r.kr:8080",
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
    console.log("request error", error);
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
      const { data } = await axios.get(`/token/refresh/${memberId}`);
      console.log("리프데이터 : ", data);
      const accessToken = data.data.accessToken;
      console.log("어쏘 : ", accessToken);
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
      const { data } = await axios.get(`/token/refresh/${memberId}`);
      console.log("리프데이터 : ", data);
      const accessToken = data.data.accessToken;
      console.log("어쏘 : ", accessToken);
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
    console.log("response error", error);
    return Promise.reject(error);
  }
);

export default axios;
