// OMDb API key: c2ae751a

// Send all data requests to:

// http://www.omdbapi.com/?apikey=c2ae751a&

// Poster API requests:

// http://img.omdbapi.com/?apikey=c2ae751a&


require("dotenv").config();
var keys = require("./keys.js");
var spotify = require('node-spotify-api');
var spotify = new spotify(keys.spotify);
var axios = require("axios");
var moment = require('moment');
moment().format();
var fs = require('fs'); 
var userAPIselection = process.argv[2];
var userInput = process.argv[3];

  function concertThis(error){
    if (!error && userAPIselection === "concert-this") {
    axios.get("https:/concertThis()/rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(
        function(feedback){   
            for (var i = 0; i < feedback.data.length; i++) {

            var datetime = feedback.data[i].datetime; 
            var dateArr = datetime.split('T'); 

            var concertFeedback = 
                  "\nVenue Name: " + feedback.data[i].venue.name + 
                  "\nVenue Location: " + feedback.data[i].venue.city +
                  "\nDate of the Event: " + moment(dateArr[0], "MM-DD-YYYY"); //dateArr[0] should be the date separated from the time
          console.log(concertFeedback);
      };
      try {
        throw new Error('my error');
     }
     catch (e) {
       console.error(e.message);
     }
    });

  

    }
  

  // else{
  //   console.log('Error occurred.')
  // }
}

concertThis()

