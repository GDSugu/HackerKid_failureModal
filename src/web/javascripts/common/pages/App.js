import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import loadable from '@loadable/component';
import NavBar from '../components/NavBar';

const Loading = () => <div>Loading...</div>;

const RouteIndex = loadable(() => import('./Index'), { fallback: <Loading /> });
const RouteAbout = loadable(() => import('./About'), { fallback: <Loading /> });
const RouteSignin = loadable(() => import('./Login'), { fallback: <Loading /> });
const RouteDashboard = loadable(() => import('./Dashboard'), { fallback: <Loading /> });
const RouteGames = loadable(() => import('./Games'), { fallback: <Loading /> });
const RouteCourses = loadable(() => import('./Courses'), { fallback: <Loading /> });
const RouteChallenges = loadable(() => import('./Challenges'), { fallback: <Loading /> });
const RouteMore = loadable(() => import('./More'), { fallback: <Loading /> });

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route index path='/' caseSensitive={true} element={<RouteIndex />} />
      <Route path='/' caseSensitive={true} element={<NavBar />}>
        <Route path='dashboard' caseSensitive={true} element={<RouteDashboard />} />
        <Route path='games' caseSensitive={true} element={<RouteGames />} />
        <Route path='courses' caseSensitive={true} element={<RouteCourses />} />
        <Route path='challenges' caseSensitive={true} element={<RouteChallenges />} />
        <Route path='more' caseSensitive={true} element={<RouteMore />} />
      </Route>
      <Route path='/about' caseSensitive={true} element={<RouteAbout />} />
      <Route path='/login' caseSensitive={true} element={<RouteSignin />} />
      <Route path='*' element={ <Navigate to='/' />} />
    </Routes>
  </BrowserRouter>
);

export default App;
