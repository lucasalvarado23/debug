import React from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import App from './App';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Event from './Event/Event';
import EventInfo from './EventInfo/EventInfo';
import Detail from './Detail/Detail';
import EventDetail from './EventDetail/EventDetail';
import MyEvents from './MyEvents/MyEvents';
import Register from './Register/Register';
import Callback from './Callback/Callback';
import Attending from './Attending/Attending';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
        <div>
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/Home" render={(props) => <Home auth={auth} {...props} />} />
          <Route path="/Event" render={(props) => <Event auth={auth} {...props} />} />
           <Route path="/EventInfo" component={EventInfo} />
           <Route path="/Attending" component={Attending} />
           <Route path="/Register" render={(props) => <Register auth={auth} {...props} />} />
            <Route path="/MyEvents" render={(props) => <MyEvents auth={auth} {...props} />} />
            <Route exact path="/attendee/:id" component={Detail} />
            <Route exact path="/EventDetail/:id" component={EventDetail} />


          <Route path="/profile" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/Home"/>
            ) : (
              <Profile auth={auth} {...props} />
            )
          )} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>        
        </div>
      </Router>
  );
}