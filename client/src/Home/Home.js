import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from "../utils/API";
import history from '../history';
import './style.css';
import { stringify } from 'querystring';

class Home extends Component {
   constructor(props) {
    super(props);
    this.state = {
            userName: "",
            userEmail: "",
            occupation: "",
            aboutMe: "",
            hobbies: "",
            food: "",
            music: "",
            eventCode: "" 
    };
    this.handleInputChange = this.handleInputChange.bind(this);  
  }

//bring in user profile from auth
  componentWillMount() {
    const { userProfile, getProfile } = this.props.auth;

    getProfile((err, profile, cb) => {
      this.regCheck(profile.email);
    });
    
  }


  regCheck = (email) => {
    API.registerCheck(email)
      .then(response => {
          //if email is not in the database
          if(response.data == null){
            window.location.replace(`/Register`);
            //if email is in the database
          }else{
            //get user name
            let res = response.data;
            let username = response.data.userName;
             //capitalize user name
             username = username.split(/\s+/).map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
            //set userName state
             this.setState({ userName: username, userEmail: res.userEmail, occupation: res.occupation, aboutMe: res.aboutMe, hobbies: res.hobbies, food: res.food, music: res.music, eventCode: ""  });
          }
      })
      .catch(error => { 
          console.log(error.response);
      })
  }



  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(target + value + name);
    this.setState({
      [name]: value
    });
  }

    handleSubmit(event, state, id){
         event.preventDefault();

         console.log('Event Code: ' + this.state.eventCode);
         console.log('userID: ' + this.state.userName);

         API.updateProfile({
            userName: this.state.userName,
            userEmail: this.state.userEmail,
            occupation: this.state.occupation,
            aboutMe: this.state.aboutMe,
            hobbies: this.state.hobbies,
            food: this.state.food,
            music: this.state.music,
            inRoom: this.state.eventCode 
         })
      
      let userVar = this.state.eventCode + "?" + this.state.userName;

      window.location.replace(`/Attending?userVar=${userVar}`);

    }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { profile } = this.state; //user profile info
   // const { userInfo } = this.state.userInfo;

   // console.log("in the render: " + this.state.userName);

  


    return (
      <div className="container bg">
        {
          isAuthenticated() && (
              <h3 className="capital">
                Welcome {this.state.userName}, <br /><br /> 
                <span className="center">Create a new event</span>{' '}
                <Link to="Event"> new event</Link>
                <br/><br />
                 <form onSubmit={(e)=>this.handleSubmit(e,this.state )}>
                 <input className="eventCode"  name="eventCode" placeholder="Enter an Event Code" value={this.state.eventCode} 
              onChange={this.handleInputChange} />
                  <input type="submit" value="Submit" />
                </form>
                <br />
              </h3> 
              
              
            )
        }
        {
          !isAuthenticated() && (
              <p></p>
            )
        }
      </div>
    );
  }
}

export default Home;