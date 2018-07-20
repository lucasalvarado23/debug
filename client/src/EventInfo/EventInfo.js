import React, { Component } from 'react';
import queryString from 'query-string';
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import 'bootstrap/dist/css/bootstrap.css';
import './EventInfo.css';

class EventInfo extends Component {
  state = {
    eventCreator: "", 
    eventID: "", 
    eventName: "", 
    eventLocation: "", 
    guestNumber: 0, 
    eventDescript: "", 
    date: "", 
    dress: ""
  };

  componentDidMount(){
      let id = queryString.parse(this.props.location.search).eId;
      console.log('this is the id: ' + id);
      this.loadEvent(id);
  }

    removeEvent = id => {
      //console.log("trigger removeEvent front end eventinfo.js");
    API.removeEvent(id)
      //.then(res => this.loadBooks())
      .catch(err => console.log(err));

      window.location.replace(`/Event`);

  }

  loadEvent = (id) => {
    API.getEvent(id)
     .then(response => {
       this.setState({     
        eventCreator: response.data.eventCreator, 
        eventID: response.data.eventID, 
        eventName: response.data.eventName, 
        eventLocation: response.data.eventLocation, 
        guestNumber: response.data.guesNumber, 
        eventDescript: response.data.eventDescript, 
        date: response.data.date, 
        dress: response.data.dress
   });
  })
   .catch(function (error) {
      console.log(error.response);
   })
  }

  render() {
    console.log("in the render: " + this.state.eventHolder);
  
    return (
      <div className="info">
        <p>Event Name: {this.state.eventName}</p>
        <p>Location: {this.state.eventLocation}</p>
        <p>Date: {this.state.date}</p>
        <p>Description: {this.state.eventDescript} </p>
        <p>Dress: {this.state.dress}</p>
        <p>Number of Guests: {this.state.guestNumber}</p>
        <p>Event Invite Code: {this.state.eventID}</p>

       <DeleteBtn onClick={() => this.removeEvent(this.state.eventID)} />

      </div>
      )
  }
}

export default EventInfo;