import React, { Component } from 'react';
import history from './history';
import { Navbar, Button } from 'react-bootstrap';
import Jumbotron from './components/Jumbotron';
import MyCarousel from './components/MyCarousel';
import Footer from './components/Footer';
import './App.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;





    //console.log("hello from app.js: " + JSON.stringify(this.props));
    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
            
              <a href="Home">Who Magic</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </Button >
            {
              !isAuthenticated() && (
              <div>
                  <Button
                    id="qsLoginBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
          <div>

             <Jumbotron />
             <div className="container">
              <h2>Welcome</h2>
                 <p>
                 Picture this: you are at a conference, networking social or quite possibly a company happy hour 
and have a limited amount of time to make the right connections. You might have good social skills,
but you still have to hop from person to person aimlessly hoping to bump into the right person. </p><p>That
is where WHO MAGIC comes in. With WHO MAGIC, you can take the 
guess work out of the who's who game. 

WHO MAGIC is a digital networking assistant that helps you to 
quickly learn the possible connections at the networking event
you are participating in by showing you who else is at the event.</p><p> WHO MAGIC 
helps to expedite the networking process and increase the likely hood that 
you will succeed in your networking endeavors! 
                 </p>
                 <MyCarousel />
                 <Footer />
             </div>
            </div>
            </div>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.goTo.bind(this, 'profile')}
                  >
                    Profile
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.goTo.bind(this, 'Event')}
                  >
                    Make Event
                  </Button>
                )
            }
             {
              isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.goTo.bind(this, 'MyEvents')}
                  >
                    My Events
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    id="qsLogoutBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </Button>
                )
            }
          </Navbar.Header>
        </Navbar>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;

