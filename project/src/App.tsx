import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Main from './Main'; 
import Login from './pages/Login';
import Place from './pages/Place';
import Post from './pages/Post';
import Map from './pages/Map';
import PlaceDetail from './pages/PlaceDetail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/place' element={<Place />}></Route>
          <Route path='/post' element={<Post />}></Route>
          <Route path='/map' element={<Map />}></Route>
          <Route path='/placedetail' element={<PlaceDetail/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
