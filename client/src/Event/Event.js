import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from '../history';
import './Event.css';
import 'bootstrap/dist/css/bootstrap.css';
import API from "../utils/API";
import { Redirect } from 'react-router-dom';
import { stringify } from 'querystring';


class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventCreator: "",
      eventID: Math.random().toString(36).substr(2, 16),
      numberOfGuests: 0,
      eventName: "",
      eventDescription: "",
      eventLocation: "",
      date: "",
      dressCode: "Casual"
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    
  }

  componentWillMount(){
       const { userProfile, getProfile } = this.props.auth;
    let newCode = Math.random().toString(36).substr(2, 16);
    console.log("from the component");
    
 
      getProfile((err, profile, cb) => {
      console.log(profile.email);
      this.regCheck(profile.email);
    });



  }

 regCheck = (email) => {
    API.registerCheck(email)
      .then(response => {
        console.log(response.data);
        console.log("this is the real id: " + response.data.userID);
          this.setState({ userID: response.data.userID});
         // console.log('id ofthis.state.userID);
      })
 .catch(function (error) {
      console.log(error.response);
 })
}
  

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event, state, id){

   event.preventDefault();
   //set new event id
   let eId = this.state.eventID;
   console.log("this is the eid: " + eId);
   console.log("this is the userID: " + this.state.userID);

   //save event info to the database
   API.saveEvent({
    eventCreator: this.state.userID,
    eventID: this.state.eventID,
    eventName: this.state.eventName,
    eventLocation: this.state.eventLocation,
    guestNumber: parseInt(this.state.numberOfGuests),
    eventDescript: this.state.eventDescription,
    date: this.state.Date,
    dress: this.state.dressCode
   })
    .catch(err => console.log(err))
 
  window.location.replace(`/Eventinfo?eId=${eId}`);
  
  }

  render() {
        const { isAuthenticated } = this.props.auth;

    return (
      <div className="card bg  col-sm-12">
        <form onSubmit={(e)=>this.handleSubmit(e,this.state )}>
          <label>
              Name of event:
              <input type="text" name="eventName" value={this.state.eventName} 
              onChange={this.handleInputChange}/>
          </label>
          <br />
        <label>
    Location:
    <input type="text" name="eventLocation" value={this.state.eventLocation}
    onChange={this.handleInputChange}/>
  </label>
  <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Event Description:
            <input type="text" name="eventDescription"
            value={this.state.eventDescription} onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Date:
            <input type="text" name="Date" placeholder="month/day/year"
            value={this.state.Date} onChange={this.handleInputChange} />
        </label>
        <br />
        
         <h4> Dress code </h4>
        <select name="dressCode" value={this.state.dressCode} onChange={this.handleInputChange}>
  <option value="Casual">Casual</option>
  <option value="Semi-Formal">Semi-Formal</option>
  <option value="Formal">Formal</option>
  <option value="Black Tie">Black Tie</option>
  <option value="White Tie">White Tie</option>
</select>
<br />

        <input type="submit" value="Submit" />
      </form>
      </div> 
    );
  }
}

export default Event;