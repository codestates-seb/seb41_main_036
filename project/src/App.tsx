import React from 'react';
import './App.css';
import Main from './Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlaceDetail from './pages/PlaceDetail';
import LoginSign from "./pages/LoginSign"
import { RecoilRoot } from 'recoil';

function App() {

  

  return (
    <div className="App">
      <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='login' element={<LoginSign />}></Route>
        </Routes>
      <Main></Main>
      </RecoilRoot>
      </BrowserRouter>
    </div>
  );
}

export default App;
