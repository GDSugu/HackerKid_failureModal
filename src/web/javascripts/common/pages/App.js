import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import loadable from '@loadable/component';

const Loading = () => <div>Loading...</div>;

const RouteIndex = loadable(() => import('./Index'), { fallback: <Loading /> });
const RouteAbout = loadable(() => import('./About'), { fallback: <Loading /> });
const RouteSignin = loadable(() => import('./Signin'), { fallback: <Loading /> });
const RouteMainApp = loadable(() => import('./MainApp'), { fallback: <Loading /> });

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route index path='/' element={<RouteIndex/>}/>
      <Route exact path='about' element={<RouteAbout />} />
      <Route exact path='/signin' element={<RouteSignin />} />
      <Route exact path='/app/*' element={<RouteMainApp />} />
    </Routes>
  </BrowserRouter>
);

export default App;
