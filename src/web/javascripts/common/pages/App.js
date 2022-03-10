import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import loadable from '@loadable/component';

const Loading = () => <div>Loading...</div>;

// const NotFound = () => <div>404 Not Found</div>;

const RouteIndex = loadable(() => import('./Index'), { fallback: <Loading /> });
const RouteAbout = loadable(() => import('./About'), { fallback: <Loading /> });
const RouteSignin = loadable(() => import('./Signin'), { fallback: <Loading /> });
const RouteMainApp = loadable(() => import('./MainApp'), { fallback: <Loading /> });

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route index path='/' element={<RouteIndex />} />
      <Route path='/*' element={<RouteMainApp />} />
      <Route path='/about' element={<RouteAbout />} />
      <Route path='/signin' element={<RouteSignin />} />
    </Routes>
  </BrowserRouter>
);

export default App;
