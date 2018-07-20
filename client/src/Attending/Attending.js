import React, { Component } from "react";
import queryString from 'query-string';
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import profile from "../Profile/Profile";
import picture from '../images/shady.jpg';
import './Attending.css';

class Attending extends Component {

  state = {
  
    attendees: [], 
    eventInfo: [],
    comeBack: "",
    eventComeBack: "",

  };

  componentWillMount() {
    let id = queryString.parse(this.props.location.search).userVar;
    let show =  window.location.search.substring(1)
    console.log("show: " + id);
    var res = id.split("?");
      this.attending(res[0], res[1]); //who is coming to the party

  // this.loadBooks();

    //grab all users in event

  }


  getEventInfo = (eventCode, entries, comeback) => {
    API.getActualEvent(eventCode)
    .then((response) => {
      this.setState({  attendees: entries, eventInfo: response.data, comeBack: comeback, eventComeBack: comeback + '=Attending' });
    
    })
  }

  attending = (eventCode, comeback) => {
    API.getAttending(eventCode)
    .then((response) => {

    let entries = [];

    for (var i = 0; i < response.data.length; i++){
      entries[i] = response.data[i];
    }

    this.getEventInfo(eventCode, entries, comeback);

  })

 
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        company: this.state.company,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {


    return (
      <Container fluid>
        <Row>
          <Col size="md-12 sm-12">
            <Jumbotron>
            </Jumbotron>
                          <h1>{this.state.eventInfo.eventName}</h1>
            <List>
               <ListItem key="hello">
                <Link to={"/EventDetail/" + this.state.eventInfo.eventID + '=' + this.state.eventComeBack}>
                      <strong>
                       EVENT INFO 
                      </strong>
                </Link>
               </ListItem>
            </List>

            {this.state.attendees.length ? (
              <List>
                {this.state.attendees.map(attendee => (
                  <ListItem key={attendee.userID}>
                  <img className="imageAdjust" src={attendee.imagePreviewUrl} />

                    <Link to={"/attendee/" + attendee.userID + '=' + this.state.eventInfo.eventID + '=' + this.state.comeBack}>
                      <strong>
                        {attendee.userName} is a: {attendee.occupation}
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

export default Attending;
