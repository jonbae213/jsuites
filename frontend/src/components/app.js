import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import SplashPage from './splash/splash_page';
import Calendar from './calendar/calendar_container';
import NavBarContainer from './navbar/navbar_container';
import SidebarContainer from './sidebar/sidebar_container';
import '../stylesheets/master.scss';
import Modal from './modal/modal';
const path = require('path');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}
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