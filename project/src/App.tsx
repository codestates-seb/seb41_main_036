import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Main from './Main'; 
import LoginSign from './pages/LoginSign';
import Place from './pages/Place';
import Post from './pages/Post';
import Map from './pages/Map';
import WritePost from "./pages/WritePost";
<<<<<<< HEAD
<<<<<<< HEAD
import PlaceDetail from "./pages/PlaceDetail";
import { RecoilRoot } from "recoil";
import DetailPost from "./pages/DetailPost";
import MyPage from "./pages/MyPage";
=======
import PlaceDetail from './pages/PlaceDetail';
import { RecoilRoot } from 'recoil';

>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
=======
import PlaceDetail from './pages/PlaceDetail';
import { RecoilRoot } from 'recoil';

>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f

function App() {

  

  return (
    <div className="App">
      <BrowserRouter>
<<<<<<< HEAD
<<<<<<< HEAD
          <Routes>
            <Route path="/login" element={<LoginSign />}></Route>
            <Route path="/" element={<Main />} />
            <Route path="/attractions" element={<Place />} />
            <Route path="/posts" element={<Post />} />
            <Route path="/write" element={<WritePost />} />
            <Route path="/map" element={<Map />} />
            <Route path="/attractions/detail/:id" element={<PlaceDetail />} />
            <Route path="/posts/detail/:id" element={<DetailPost />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>

=======
=======
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
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
>>>>>>> f22c72ca01f31001cbc1f954051d1a14eac5230f
      </BrowserRouter>
    </div>
  );
}

export default App;