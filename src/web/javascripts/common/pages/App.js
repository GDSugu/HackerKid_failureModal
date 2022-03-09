import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Index from './Index';
import About from './About';
import Signin from './Signin';
import Home from './Home';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route index path='/' element={<Index/>}/>
      <Route path='about' element={<About />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/home' element={<Home />} />
    </Routes>
  </BrowserRouter>
);

export default App;
