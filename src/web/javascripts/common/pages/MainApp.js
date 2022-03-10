import React from 'react';
import {
  // Navigate,
  Routes,
  Route,
} from 'react-router-dom';
import loadable from '@loadable/component';
import NavBar from '../components/NavBar';

const Loading = () => <div>Loading...</div>;

const RouteHome = loadable(() => import('./Home'), { fallback: <Loading /> });
const RouteGames = loadable(() => import('./Games'), { fallback: <Loading /> });
const RouteCourses = loadable(() => import('./Courses'), { fallback: <Loading /> });
const RouteChallenges = loadable(() => import('./Challenges'), { fallback: <Loading /> });
const RouteMore = loadable(() => import('./More'), { fallback: <Loading /> });

const MainApp = (props) => {
  console.log(props);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='home' element={<RouteHome />} />
        <Route path='games' element={<RouteGames />} />
        <Route path='courses' element={<RouteCourses />} />
        <Route path='challenges' element={<RouteChallenges />} />
        <Route path='more' element={<RouteMore />} />
      </Routes>
    </>
  );
};

export default MainApp;
