import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Main from './Main'; 
import LoginSign from './pages/LoginSign';
import Place from './pages/Place';
import Post from './pages/Post';
import Map from './pages/Map';
import PlaceDetail from './pages/PlaceDetail';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/login' element={<LoginSign />}></Route>
          <Route path='/place' element={<Place />}></Route>
          <Route path='/post' element={<Post />}></Route>
          <Route path='/map' element={<Map />}></Route>
          <Route path='/placedetail' element={<PlaceDetail/>}></Route>
        </Routes>
      </RecoilRoot>
      </BrowserRouter>
    </div>
  );
}

export default App;