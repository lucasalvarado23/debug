import axios from "axios";



export default {
 
  //WMUSERS API CALLS
    //Registration email check
    registerCheck: function(email){
      return axios.get("/api/wmUser/" + email);
    },

    getAttending: function(eventCode){
      return axios.get("/api/wmUser/getAttending/" + eventCode);
    },

    getAttendee: function(userID){
      return axios.get("/api/wmUser/getAttendee/" + userID);
    },

    createUser: function(userData){ 
      return axios.post("/api/wmUser/", userData);
    },

    updateProfile: function(userUpdate, email){
      return axios.put("/api/wmUser/" + email, userUpdate);
    },

  //EVENTS API CALLS
    saveEvent: function(eventData){
      return axios.post("/api/event/", eventData);
    },

    getMyEvents: function(userID){
      return axios.get("/api/event/myEvents/" + userID);
    },
    
    getActualEvent: function(eventCode){
      return axios.get("/api/event/actualEvent/" + eventCode);
    },

    getEvent: function(id){
      console.log("hit the getevent api axios");
      return axios.get("/api/event/" + id);
    },

    removeEvent: function(id){
      console.log("trigger axios");
      return axios.delete("/api/event/" + id);
    }
  };
