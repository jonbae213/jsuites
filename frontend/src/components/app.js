import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import SplashPage from './splash/splash_page';
import Calendar from './calendar/calendar_container';
import NavBarContainer from './navbar/navbar_container';
import SidebarContainer from './sidebar/sidebar_container';
import '../stylesheets/master.scss';
import Modal from './modal/modal';

const App = () => (
  <>
    <Modal />
    <ProtectedRoute exact path="/" component={NavBarContainer} />
    <ProtectedRoute exact path="/" component={SidebarContainer} />
    <Switch>
      <AuthRoute exact path="/login" component={SplashPage} />
      <ProtectedRoute exact path="/" component={Calendar} />
    </Switch>
  </>
);

export default App;