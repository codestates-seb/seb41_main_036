import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import Axios from "axios"
import axios from "./utils/axiosinstance"

axios.defaults.withCredentials = true
Axios.defaults.withCredentials = true


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
  );
  root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);

reportWebVitals();
