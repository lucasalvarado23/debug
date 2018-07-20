import React, { Component } from 'react';
import queryString from 'query-string';
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { Link } from "react-router-dom";
import Jumbotron from "../components/Jumbotron";
import './MyEvents.css';



class MyEvents extends Component {
  state = {
    myEvents: []
  };

  componentWillMount(){
    const { userProfile, getProfile } = this.props.auth;

    getProfile((err, profile, cb) => {
      console.log(profile.email);

      this.regCheck(profile.email);
   //  this.findMyEvents("o7lghldifkc");
    });
  }

  regCheck = (email) => {
    API.registerCheck(email)
      .then(response => {
      //  console.log(response.data); 
       // this.findMyEvents(response.data.userID);
       this.findMyEvents(response.data.userID);
      
   //this.setState({user: response.data.userID});
      })
    .catch(function (error) {
      console.log(error.response);
 })
}


findMyEvents = (userID) => {
    API.getMyEvents(userID)
    .then((response) => {
    console.log("it works: " + response .data);

    let events = [];

    for (var i = 0; i < response.data.length; i++){
      events[i] = response.data[i];
    } 
    //console.log(events[0].eventName);
    this.setState({ myEvents: events});
  })
     .catch(function (error) {
      console.log(error.response);
 })

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
   // console.log("in the render: " + this.state.eventHolder);
  
    return (
 <Container fluid>
        <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
            </Jumbotron>
            <h1>Created Events</h1>

            {this.state.myEvents.length ? (
              <List>
                {this.state.myEvents.map(myEvent => (
                  <ListItem key={myEvent.eventID}>
                    <Link to={"/EventDetail/" + myEvent.eventID}>
                      <strong>
                        {myEvent.eventName} 
                      </strong>
                    </Link>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row> 
      </Container>
    );
  }
}



export default MyEvents;