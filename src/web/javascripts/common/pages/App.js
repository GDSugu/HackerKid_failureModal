import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Index from './Index';
import About from './About';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route index path='/' element={<Index/>}/>
      <Route path='about' element={<About/>}/>
    </Routes>
  </BrowserRouter>
);

export default App;
