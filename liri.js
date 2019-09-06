
// Global Variables
// Required Packages
require("dotenv").config();
var keys = require("./keys.js");
var spotify = require("node-spotify-api");
var spotify = new spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs"); 

// Store process.argv into variable 
var nodeArgs = process.argv;
var nodeArgument = "";

// Combine all the words after process.argv index 2 into one string using a For Loop
for (var i = 3; i < nodeArgs.length; i++) {
  // Assign to a variable
  nodeArgument += " " + nodeArgs[i]
  // Trim extra spaces
  nodeArgument = nodeArgument.trim()
  //console.log(process.argv[2])
  //console.log(process.argv[3])
  //console.log(nodeArgument)
};

//Create function Switch statement using the required commands from user as cases
function commands (selection, value) {
  switch (selection) {
    case "concert-this":
      concertAPI(value);
      break;
    case "spotify-this-song":
      spotifyAPI(value);
      break;
    case "movie-this":
      movieAPI(value);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:  
      console.log("LIRI BOT does not recognize this command");
  };
};

// Create new function that runs the commands function using similar arguments which will be set below 
function runCommand (argOne, argTwo) {
  commands(argOne, argTwo);
};

// Create function to pass in process.argv's as arguments
runCommand(process.argv[2], nodeArgument);

//////////////////////////////////// START OF 'CONCERT-THIS' /////////////////////////////////////

// Create concertAPI function here
function concertAPI (artist) {   
  // Place URL into variable for debugging
  var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  // Axios Get request
  axios.get(queryURL).then(function (response) {      
    //console.log(queryURL)
    // console.log(response.data)

    // Store data into variable to shorten code
    var data = response.data;    
    // Loop through responses
    for (var i = 0; i < data.length; i++) {
      // Grab date/time of each event and assign to a variable
      var datetime = data[i].datetime; 
      // Split the data into an array and assign to a variable
      var dateArray = datetime.split('T'); 
      // Format date into MM/DD/YYYY using moment.js and assign to a variable
      var day = moment(dateArray[0]).format("MM/DD/YYYY");
      // Format time into HH:mm AM/PM using moment.js and assign to a variable
      var time = moment(dateArray[1], "HH:mm:ss").format("hh:mm A");
      // Combine day and time into one variable
      var date = day + " @ " + time + " (Local Time)";
      // Grab the city, state, country of each venue and combine into one variable
      var state = data[i].venue.region;
      var country = data[i].venue.country;
      var city = data[i].venue.city;
      var location = city + ", " + state + ", " + country;

      // console.log the required concert information for the user
      console.log("Venue Name: " + data[i].venue.name);   
      console.log("Venue Location: " + location);
      console.log("Date: " + date);
      console.log("==============================================================================");
    };   
      console.log("Note: If no information appeared, this artist may not have any upcoming concerts");
      console.log("If this is the wrong artist, please check for correct spelling");    
      console.log("==============================================================================");
  }).catch(function (error) {
      console.log("==============================================================================");
      console.log("Error: We could not find your concert. Please try again.");
      console.log("Tip: Check the spelling of the artist/band.");
      console.log("==============================================================================");
      // console.log(error);
    });
};

///////////////////////////////////// END OF 'CONCERT-THIS' //////////////////////////////////////


////////////////////////////////// START OF 'SPOTIFY-THIS-SONG' /////////////////////////////////

// Create short function to find artists names for .map
function artistNames(artist) {
    return artist.name;
  };

// Create the spotifyAPI function here
function spotifyAPI(songName) {
  // Begin If statement in case a song is not entered after command
  if (songName) {
    // Use node-spotify-api docs to set up searches
    spotify.search({type: "track", query: songName}, function(error, data) {
      if (error) {
        return console.log("Error occurred: " + error);
      };

      // Put data.tracks.items object into variable to shorten code
      var songs = data.tracks.items;
      //console.log(data.tracks.items[0]); 

      // Loop through songs variable and console.log all required song information
      for (var i = 0; i < songs.length; i++){
        console.log("Artist(s): " + songs[i].artists.map(artistNames));
        console.log("Song Name: " + songs[i].name);
        console.log("Preview song: " + songs[i].preview_url);
        console.log("Album: " + songs[i].album.name);
        console.log("==============================================================================");
      };  
    });
  } 
  // Else statement in case a song is not entered after command, alert user of Error and suggest Ace of Base's "The Sign"
  else {
    console.log("Error: A song was not entered");
    console.log("==============================================================================");
    console.log("Suggestion:");
    console.log("Artist: Ace of Base");
    console.log("Song Name: The Sign");
    console.log("Preview song: <https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=fc5f31bbde1e400687ad0b26c4f50951>");
    console.log("Album: The Sign (US Album) [Remastered]");
    console.log("==============================================================================");
  };
};

///////////////////////////////// END OF 'SPOTIFY-THIS-SONG' ////////////////////////////////


/////////////////////////////////// START OF 'MOVIE-THIS' ////////////////////////////////////

// Create movieAPI function here
function movieAPI (movieName) {
  // Create an if-statement in case the user does not enter a movie title and set default movie to Mr. Nobody
  if (movieName == "") {
    // Place URL into variable for debugging
    var queryURL = "http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy";
    // Axios Get request
    axios.get(queryURL).then(function (response) {      
      //console.log(queryURL)
      //console.log(response.data)

      // Store data into variable to shorten code
      var data = response.data;
        
      //console.log the default movie information along with Error alert
      console.log("Error: A movie title was not entered");
      console.log("==============================================================================");
      console.log("Suggestion:");
      console.log("If you haven't watched 'Mr. Nobody', then you should: <http://www.imdb.com/title/tt0485947/>");
      console.log("It's on Netflix!");
      console.log("Title: " + data.Title);
      console.log("Year: " + data.Year);
      console.log("IMDB Rating: " + data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
      console.log("Country: " + data.Country);
      console.log("Language: " + data.Language);
      console.log("Actors: " + data.Actors); 
      console.log("Plot: " + data.Plot);        
  
    }).catch(function (error) {
      console.log("==============================================================================");
      console.log("Error: We could not find your movie. Please try again.");
      console.log("Tip: Check the spelling of your movie title.");
      console.log("==============================================================================");
      console.log(error);
      });
  } 
  // Else Statement for when user correctly enters movie title, re-run moveiAPI code minus default movie and error alert.  
  else {
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL).then(function (response) {
    //console.log(queryURL)
    //console.log(response.data)

    var data = response.data;     

    console.log("Title: " + data.Title);
    console.log("Year: " + data.Year);
    console.log("IMDB Rating: " + data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
    console.log("Country: " + data.Country);
    console.log("Language: " + data.Language);
    console.log("Actors: " + data.Actors); 
    console.log("Plot: " + data.Plot);

    }).catch(function (error) {
      console.log("==============================================================================");
      console.log("Error: We could not find your movie. Please try again.");
      console.log("Tip: Check the spelling of your movie title.");
      console.log("==============================================================================");
      console.log(error);
      });
  };
};

/////////////////////////////////// END OF 'MOVIE-THIS' //////////////////////////////////////


//////////////////////////////// START OF 'DO-WHAT-IT-SAYS' //////////////////////////////////

//Create doWhatItSays function to read the random.txt file
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) throw err;
    // Create array based on comma
    var dataArray = data.split(",");
      // Pass in both items in array as arguments within the commands function
    if (dataArray.length == 2) {
       commands(dataArray[0], dataArray[1]);
    } 
    // If user only enters command and not the song, pass in the first item in the dataArray as an argument within the command function
    else if (dataArray.length == 1) {
    commands(dataArray[0]);
  };
  //console.log(data)
});
};

//////////////////////////////// END OF 'DO-WHAT-IT-SAYS' /////////////////////////////////