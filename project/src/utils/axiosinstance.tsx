import Axios, { AxiosHeaders } from "axios";

const axios = Axios.create({});

axios.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem("authorization");
    //  = {
    //   authorization: auth,
    // };
    console.log("콘피그", config.headers.use)
    return config;
  },
  (error) => {
    console.log("request error", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (res) {
    console.log("리스폰 인터셉트");
    return res;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 400) {
      if (error.response.data.message === "Token Expired") {
        const originalRequest = config;
        const memberId = localStorage.getItem("memberId");
        const { data } = await axios.get(`token/refresh/${memberId}`);
        const authorization = data.data.accessToken;
        await localStorage.setItem("authorization", `${authorization}`);
        originalRequest.headers.authorization = authorization;
        return axios(originalRequest);
      }
    }
    console.log("response error", error);
    return Promise.reject(error);
  }
);

export default axios;
