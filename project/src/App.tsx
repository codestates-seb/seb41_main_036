import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Main from './Main'; 
import LoginSign from './pages/LoginSign';
import Place from './pages/Place';
import Post from './pages/Post';
import Map from './pages/Map';
import WritePost from "./pages/WritePost";
import PlaceDetail from './pages/PlaceDetail';
import { RecoilRoot } from 'recoil';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path='/login' element={<LoginSign />}></Route>
          <Route path="/" element={<Main />} />
          <Route path="/place" element={<Place />} />
          <Route path="/post" element={<Post />} />
          <Route path="/write" element={<WritePost />} />
          <Route path="/map" element={<Map />} />
          <Route path="/placedetail" element={<PlaceDetail />} />

        </Routes>
      </RecoilRoot>
      </BrowserRouter>
    </div>
  );
}

export default App;