import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
<<<<<<< HEAD
import Main from './Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
=======
import Main from './Main'; 
import Login from './pages/Login';
import Place from './pages/Place';
import Post from './pages/Post';
import Map from './pages/Map';
>>>>>>> f9cd5540221c5c55fb331eecce5c759c07e82415
import PlaceDetail from './pages/PlaceDetail';
import LoginSign from "./pages/LoginSign"
import { RecoilRoot } from 'recoil';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
<<<<<<< HEAD
      <RecoilRoot>

        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='login' element={<LoginSign />}></Route>
        </Routes>
      <Main></Main>
      </RecoilRoot>
=======
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/place' element={<Place />}></Route>
          <Route path='/post' element={<Post />}></Route>
          <Route path='/map' element={<Map />}></Route>
          <Route path='/placedetail' element={<PlaceDetail/>}></Route>
        </Routes>
>>>>>>> f9cd5540221c5c55fb331eecce5c759c07e82415
      </BrowserRouter>
    </div>
  );
}

export default App;
