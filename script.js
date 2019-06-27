OMDb API key: c2ae751a

Send all data requests to:

http://www.omdbapi.com/?apikey=c2ae751a&

Poster API requests:

http://img.omdbapi.com/?apikey=c2ae751a&




// Config information (npm connecting to keys.js)
require("dotenv").config();
var keys = require("./keys.js");
var spotify = require('node-spotify-api');
var spotify = new spotify(keys.spotify);
var axios = require("axios");

// Runtime global variables
var userCommandChoice = process.argv[2];
var artist = process.argv[3];

// If statements to run program based on user commands
if (userCommandChoice === "concert-this") {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function(response) {
        console.log("Venue Name: " + response);
        }
    );
}