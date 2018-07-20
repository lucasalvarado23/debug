import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import './EventDetail.css';

class EventDetail extends Component {
  state = {
    eventInfo: [],
    goBack: "",
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    console.log("you made it");
    let info = this.props.match.params.id;
    var res = info.split("=");
    console.log('in here' + res[0] + res[1] + res[2]);

   
    this.getEvent(res[0], res);

  }  
    getEvent(eventCode, res){
      API.getActualEvent(eventCode)
      .then((response) => {
        console.log(response.data);

          if(res[2] == "Attending"){
            console.log("came from attending");
            this.setState({ eventInfo: response.data, goBack: '/Attending?userVar=' + res[0] + '?' + res[1]  });

          }else{
            console.log("came from myEvents");
            this.setState({ eventInfo: response.data, goBack: "/MyEvents" });
          }

      
      })
    }


  render() {
  
    
    return (
        <Container fluid>
        <Row>
          <Col size="md-12">
            <h1>{this.state.eventInfo.eventName}</h1>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h2 className="notCentered">Date</h2>
              <p>{this.state.eventInfo.date}</p>
               <h2 className="notCentered">Location</h2>
              <p>{this.state.eventInfo.eventLocation}</p>
              <h2 className="notCentered">Guest Invites Me</h2>
              <p>{this.state.eventInfo.guestNumber}</p>
              <h2 className="notCentered">Description</h2>
              <p>{this.state.eventInfo.eventDescript}</p>
           
              <h2 className="notCentered">Dress Code</h2>
              <p>{this.state.eventInfo.dress}</p>

                          <Link to={this.state.goBack}>← Back to the Event Room</Link>

              
            </article>
          </Col>
        </Row>
    
      </Container>
    

    );
  } 
}

export default EventDetail;
