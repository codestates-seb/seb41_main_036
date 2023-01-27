import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Main from "./pages/Main";
import LoginSign from "./pages/LoginSign";
import Place from "./pages/Place";
import Post from "./pages/Post";
import Map from "./pages/Map";
import WritePost from "./pages/WritePost";
import PlaceDetail from "./pages/PlaceDetail";
import { RecoilRoot } from "recoil";
import DetailPost from "./pages/DetailPost";
import MyPage from "./pages/MyPage";
import EditPost from "./pages/EditPost ";
import Oauth from "./pages/Oauth";

function App() {
  if (localStorage.getItem("loginStatus") === null) {
    localStorage.setItem("loginStatus", "false");
  }

  return (
    <div className="App">
      <BrowserRouter>
        <RecoilRoot>
          <Routes>
            <Route path="/login" element={<LoginSign />}></Route>
            <Route path="/" element={<Main />} />
            <Route path="/attractions" element={<Place />}>
              <Route path="search" element={<Place />} />
            </Route>
            <Route path="/posts" element={<Post />} />
            <Route path="/write" element={<WritePost />} />
            <Route path="/map" element={<Map />} />
            <Route path="/attractions/detail/:id" element={<PlaceDetail />} />
            <Route path="/posts/detail/:id" element={<DetailPost />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/oauth" element={<Oauth />} />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </div>
  );
}

export default App;
