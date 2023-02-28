import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom';
import loadable from '@loadable/component';
import { FormattedMessage } from 'react-intl';
import 'bootstrap';
import AuthNav from '../components/AuthNav/AuthNav';
import '../../../stylesheets/common/sass/importers/_bootstrap.scss';
import '../../../stylesheets/common/sass/importers/_fontawesome.scss';
import Loader from '../components/Loader';
import { loginCheck } from '../framework';

// const Loading = () => <div>Loading...</div>;
const Loading = () => <Loader />;

const AccountNavBar = loadable(() => import('../components/AccountNavBar'), { fallback: <Loading /> });
const NavBar = loadable(() => import('../components/NavBar'), { fallback: <Loading /> });
const RouteAbout = loadable(() => import('./About'), { fallback: <Loading /> });
const RouteLogin = loadable(() => import('./Login'), { fallback: <Loading /> });
const RouteRegister = loadable(() => import('./Register'), { fallback: <Loading /> });
const RoutePricing = loadable(() => import('./PricingPlans'), { fallback: <Loading /> });
const RouteForgotPassword = loadable(() => import('./ForgotPassword'), { fallback: <Loading /> });
const RouteDashboard = loadable(() => import('./Dashboard'), { fallback: <Loading /> });
const RouteGames = loadable(() => import('./Games'), { fallback: <Loading /> });
const RouteCourses = loadable(() => import('./Courses'), { fallback: <Loading /> });
const RouteAllChallenges = loadable(() => import('./AllChallenges'), { fallback: <Loading /> });
const RouteVideos = loadable(() => import('./Videos'), { fallback: <Loading /> });
const RouteChallenges = loadable(() => import('./Challenges'), { fallback: <Loading /> });
const RouteYourChallenges = loadable(() => import('./YourChallenges'), { fallback: <Loading /> });
const RouteYourDraftChallenges = loadable(() => import('./YourDraftChallenges'), { fallback: <Loading /> });
const RouteMore = loadable(() => import('./More'), { fallback: <Loading /> });
const RouteProfileEdit = loadable(() => import('./ProfileEdit'), { fallback: <Loading /> });
// const RouteSubscription = loadable(() => import('./Subscription'), { fallback: <Loading /> });
const RouteLeaderBoard = loadable(() => import('./Leaderboard'), { fallback: <Loading /> });
const RouteCertificates = loadable(() => import('./Certificates'), { fallback: <Loading /> });
const RouteAwards = loadable(() => import('./Awards'), { fallback: <Loading /> });
// const RouteCollectibles = loadable(() => import('./Collectibles'), { fallback: <Loading /> });
const RouteTurtle = loadable(() => import('./Turtle'), { fallback: <Loading /> });
const RouteZombieLand = loadable(() => import('./ZombieLand'), { fallback: <Loading /> });
const RouteCodekata = loadable(() => import('./Codekata'), { fallback: <Loading /> });
const RouteViewCertificate = loadable(() => import('./ViewCertificate'), { fallback: <Loading /> });
// const RouteSubscription = loadable(() => import('./Subscription'), { fallback: <Loading /> });
const RouteClub = loadable(() => import('./Clubs'), { fallback: <Loading /> });
const RouteWebkata = loadable(() => import('./Webkata'), { fallback: <Loading /> });
const RouteIde = loadable(() => import('./Ide'), { fallback: <Loading /> });
const RouteLanding = loadable(() => import('./Landing'), { fallback: <Loading /> });

const App = () => {
  React.useEffect(() => {
    // except for the landing page, all other pages should be protected
    if (window.location.pathname !== '/') {
      loginCheck();
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' caseSensitive={true} element={<RouteLanding />} />
        <Route path='/' caseSensitive={true} element={<NavBar />}>
          <Route path='dashboard' caseSensitive={true} element={<RouteDashboard />} />
          <Route path='games' caseSensitive={true} element={<RouteGames />} />
        <Route path='ide' caseSensitive={true} element={<RouteIde/>} />
        <Route path='courses' caseSensitive={true} element={<RouteCourses />} />
        {/* <Route path='videos' caseSensitive={true} element={<RouteCourses />} /> */}
        <Route path='courses/:moduleId' element={<RouteVideos />} />
        <Route path='courses/:moduleId/:id' element={<RouteVideos />} />
        <Route path='courses/:moduleId/:id/:questionName' element={<RouteVideos />} />
        <Route path='challenges' caseSensitive={true} element={<RouteChallenges />} />
        <Route path='all-challenges' caseSensitive={true} element={<RouteAllChallenges />} />
        <Route path='your-challenges' caseSensitive={true} element={<RouteYourChallenges />} />
        <Route path='your-challenges/drafts' caseSensitive={true} element={<RouteYourDraftChallenges />}/>
          {/* <Route path='more' caseSensitive={true} element={<RouteMore />} /> */}
          <Route path='more' caseSensitive={true} element={<RouteMore />} />
          <Route path='leaderboard' caseSensitive={true} element={<RouteLeaderBoard />} />
          {/* <Route path='/more/' caseSensitive={true} element={ <AccountNavBar />} /> */}
          <Route path='certificates' caseSensitive={true} element={<RouteCertificates />} />
          <Route path='certificate/view/:id' caseSensitive={true} element={<RouteViewCertificate />} />
          <Route path='awards' caseSensitive={true} element={<RouteAwards />} />
          {/* <Route path='collectibles' caseSensitive={true} element={<RouteCollectibles />} /> */}
          <Route
            path='profile'
            caseSensitive={true}
              element={
              <AccountNavBar backNavigationUrl='/dashboard' NavItems={(screen) => <>
                <div className={`account-nav-item ${screen === 'edit' ? 'active' : ''}`}>
                  <Link to='edit'>
                    <FormattedMessage
                      defaultMessage='Profile Settings'
                      description='Navigation link to profile edit page'
                    />
                  </Link>
                </div>
                {/* <div
                className={`account-nav-item ${screen === 'subscription'
                 ? 'active' : ''}`}>
                <Link to='subscription'>
                  <FormattedMessage
                    defaultMessage='Subscription'
                    description='Navigation link to subscription page'
                  />
                </Link>
              </div> */}
            </>} />
          }>
          <Route path='edit' caseSensitive={true} element={<RouteProfileEdit />} />
          {/* <Route path='subscription' caseSensitive={true} element={<RouteSubscription />} /> */}
        </Route>
        <Route path='clubs' caseSensitive={true} element={<RouteClub />} />
        <Route path='clubs/:id' element={<RouteClub />} />
        <Route path='turtle/*' caseSensitive={true} element={<RouteTurtle />} />
        {/* <Route path='turtle/:id' element={<RouteTurtle />} />
        <Route path='turtle/:id/:uniqueString' element={<RouteTurtle />} /> */}
        <Route path='webkata/:conceptId' element={<RouteWebkata />} />
        <Route path='webkata/:conceptId/:id' element={<RouteWebkata />} />
        <Route path='webkata/:conceptId/:id/:uniqueString' element={<RouteWebkata />} />
        <Route path='coding-pirate' caseSensitive={true} element={<RouteCodekata />} />
        <Route path='coding-pirate/:id' element={<RouteCodekata />} />
        <Route path='coding-pirate/:id/:uniqueString' element={<RouteCodekata />} />
          {/* </Route> */}
        {/* </Route> */}
        <Route path='zombieland' caseSensitive={true} element={<RouteZombieLand />} />
        <Route path='zombieland/:id' element={<RouteZombieLand />} />
        <Route path='zombieland/:id/:uniqueString' element={<RouteZombieLand />} />
      </Route>
      <Route path='/' caseSensitive={true} element={<AuthNav/>}>
        <Route path='login' caseSensitive={true} element={<RouteLogin />} />
        <Route path='register' caseSensitive={true} element={<RouteRegister />} />
        <Route path='forgot-password' caseSensitive={true} element={<RouteForgotPassword />} />
      </Route>
      <Route path='/' caseSensitive={true} element={<NavBar showIcons={false}/>}>
        <Route path='pricing' element={<RoutePricing />} />
      </Route>
      <Route path='/about' caseSensitive={true} element={<RouteAbout />} />
      <Route path='*' element={ <Navigate to='/' />} />
    </Routes>
  </BrowserRouter>);
};

export default App;
