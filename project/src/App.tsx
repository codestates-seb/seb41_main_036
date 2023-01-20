import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Main from "./Main";
import Login from "./pages/Login";
import Place from "./pages/Place";
import Post from "./pages/Post";
import Map from "./pages/Map";
import PlaceDetail from "./pages/PlaceDetail";
import WritePost from "./pages/WritePost";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place" element={<Place />} />
          <Route path="/post" element={<Post />} />
          <Route path="/write" element={<WritePost />} />
          <Route path="/map" element={<Map />} />
          <Route path="/placedetail" element={<PlaceDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
