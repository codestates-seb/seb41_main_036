import React from 'react';
import './App.css';
import Main from './Main';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlaceDetail from './pages/PlaceDetail';

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />}></Route>
        </Routes>
      </BrowserRouter> */}
      <Main></Main>
    </div>
  );
}

export default App;
