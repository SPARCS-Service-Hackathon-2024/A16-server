import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./tailwind.css";
import Splash from './pages/Splash';
import Login from './pages/Login';

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Splash />}/>
        <Route path='/Login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;