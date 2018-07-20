import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import './Profile.css';
import API from "../utils/API";
import { Redirect } from 'react-router-dom';
import ImageUpload from '../components/imageUpload/imageUpload';
import ImageUploader from 'react-images-upload';
import history from '../history';
import { stringify } from 'querystring';

class Profile extends Component {
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
    file: "",
    imagePreviewUrl: ""
    };
    this.handleNewImage = this.handleNewImage.bind(this);
  }




  componentWillMount() {
    const { userProfile, getProfile } = this.props.auth;

    getProfile((err, profile, cb) => {
      this.regCheck(profile.email, profile);
    });
  }


  regCheck = (email, profile) => {
    console.log("from the regcheck " + profile.picture);
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
             this.setState({ userID: res.userID, userName: username, userEmail: email, occupation: res.occupation, aboutMe: res.aboutMe, hobbies: res.hobbies, food: res.food, music: res.music, imagePreviewUrl: res.imagePreviewUrl});
          }
      })
      .catch(error => { 
          console.log(error.response);
      })
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



    /*console.log(event.target.files[0]);

    var reader = readAsDataURL(event.target.files[0]);
    console.log('in the reader: ' + reader);
    this.setState({
      picture: event.target.files[0]
    });
  }
*/
   

  handleSubmit = (event, state, email) => {
   event.preventDefault()


    

    API.updateProfile({
    userID: this.state.userID,
    userName: this.state.userName.toLowerCase(),
    userEmail: this.state.userEmail.toLowerCase(),
    occupation: this.state.occupation,
    aboutMe: this.state.aboutMe, 
    hobbies: this.state.hobbies,
    food: this.state.food,
    music: this.state.music,
    imagePreviewUrl: this.state.imagePreviewUrl
   },
    this.state.userEmail.toLowerCase()

   )
   .then(function (response) {
    if(response.status == 200){
      console.log("changes made");
    }
   })
   //if there was an error registering, throw error
   .catch(function (error) {
    if(error.response){
      console.log(error.response);
    }
  // history.replace('/Attending');  
    })
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    }

    return (
      <div className="card bg"  col-sm-6>
    <div className="img-container">
          <Panel header="Profile">
          <div className="col-sm-6">

         
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
     
            <div>
            </div>
          </Panel>
        </div>
        </div>
    );
  }
}

export default Profile;