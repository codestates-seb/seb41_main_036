import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Main from "./Main";
import LoginSign from "./pages/LoginSign";
import Place from "./pages/Place";
import Post from "./pages/Post";
import Map from "./pages/Map";
import WritePost from "./pages/WritePost";
import PlaceDetail from "./pages/PlaceDetail";
import { RecoilRoot } from "recoil";
import DetailPost from "./pages/DetailPost";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RecoilRoot>
          <Routes>
            <Route path="/login" element={<LoginSign />}></Route>
            <Route path="/" element={<Main />} />
            <Route path="/attractions" element={<Place />} />
            <Route path="/post" element={<Post />} />
            <Route path="/write" element={<WritePost />} />
            <Route path="/map" element={<Map />} />
            <Route path="/attractions/detail" element={<PlaceDetail />} />
            <Route path="/post/detail" element={<DetailPost />} />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </div>
  );
}

export default App;