import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from "../utils/API";
import history from '../history';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import './Register.css';
//import { Redirect } from 'react-router-dom';
import ImageUpload from '../components/imageUpload/imageUpload';
import { stringify } from 'querystring';

class Register extends Component {
 constructor(){
    super();
    this.state = {
       userID: "",
    userName: "",
    userEmail: "",
    occupation: "",
    aboutMe: "",
    hobbies: "",
    food: "",
    music: "",
    imagePreviewUrl: ""
    };
    this.handleNewImage = this.handleNewImage.bind(this);
  }


  componentWillMount() {

    const { userProfile, getProfile } = this.props.auth;
    let newCode = Math.random().toString(36).substr(2, 16);

    getProfile((err, profile, cb) => {
      this.setState({ userID: newCode, userName: "", userEmail: profile.email, occupation: "", aboutMe: "", hobbies: "", food: "", music: "" });
     // this.regCheck(profile.email);
    });
  }

  handleSubmit(event, state){
   event.preventDefault()

   
   //New User info to send to database
   
   API.createUser({
    userID: this.state.userID,
    userName: this.state.userName.toLowerCase(),
    userEmail: this.state.userEmail.toLowerCase(),
    occupation: this.state.occupation,
    aboutMe: this.state.aboutMe, 
    hobbies: this.state.hobbies,
    food: this.state.food,
    music: this.state.music,
    imagePreviewUrl: this.state.imagePreviewUrl

   })
   //if user registers take them to homepage
   .then(function (response) {
    if(response.status == 200){
      console.log(response.status + 'do it!');
      window.location.replace(`/home`);
    }
   })
   //if there was an error registering, throw error
   .catch(function (error) {
    if(error.response.data.code == 11000){
      console.log("THE USERNAME IS NOT UNIQUE");
    }
    console.log(error.response);
   })
  
  // history.replace('/Attending');
  
 }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

handleNewImage = event => {

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      }, () => {
    console.log(this.state.imagePreviewUrl);
  });
    }

    reader.readAsDataURL(file)
  }


    render() {
    const { profile } = this.state;
       let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} class="sizer" />);
    }

    return (
      <div className="card" col-sm-6>
    <div className="img-container">
          <h1> Welcome to WHO MAGIC</h1>
          <Panel header="Register">
          <div className="col-sm-6">
          <h1>User Profile
          </h1>
  <form onSubmit={(e)=>this.handleSubmit(e,this.state)}>
        <label>
        <label>
              <input type="text" placeholder="User Name" name="userName"  value={this.state.userName} 
              onChange={this.handleInputChange}/>
          </label>
          <br />
           <label>
              <input type="text" placeholder="Occupation" name="occupation" value={this.state.title} 
              onChange={this.handleInputChange}/>
          </label>
          <br />
        <label>
              <textarea name="aboutMe" placeholder="Tell us about you..." value={this.state.aboutMe} onChange={this.handleInputChange}></textarea>
          </label>
          <br />
          <label>
    <input type="text" placeholder="Hobbies" name="hobbies" value={this.state.hobbies}
    onChange={this.handleInputChange}/>
  </label>
  <br />
        <label>
    <input type="text" placeholder="Favorite Music" name="music" value={this.state.music}
    onChange={this.handleInputChange}/>
  </label>
        <br />
        <label>
            <input type="text" placeholder="Favorite Food" name="food"
            value={this.state.food} onChange={this.handleInputChange} />
        </label>
        </label>
        <label>
                  <input type='file' onChange={this.handleNewImage} /> <br /><br />
        </label>
        <input type="submit" value="Submit" />
      </form>
          </div>
                     {$imagePreview}

          
          </Panel>
        </div>
        </div>
    );
  }
}

export default Register;