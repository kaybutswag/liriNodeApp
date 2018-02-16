require("dotenv").config();
var request = require("request");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var keys = require("./keys.js");


var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var value = process.argv[3];
var error = process.argv[4];

//everything should be in quotes!
if (error){
	console.log("Please put song or movie title in quotes.")
}

else{
	doSomething(action,value);
}


function doSomething(action,value){
switch (action) {
  case "my-tweets":
    getTweets();
    writeFile(action,"N/A");
    break;

  case "spotify-this-song":
    spotifyThis(value);
    writeFile(action,value);
    break;

  case "movie-this":
    findMovie(value);
    writeFile(action,value);
    break;

  case "do-what-it-says":
    readFile();
    writeFile(action,"N/A");
    break;

   default:
   console.log("Please type one of the following: 'my-tweets','spotify-this-song','movie-this','do-what-it-says'");
}
}

function writeFile(action,value){
	var text="\n"+action+" "+value;
	fs.appendFile("log.txt",text, function(err) {
    if (err) {
      return console.log(err);
    }
  });
}


//my-tweets
function getTweets(){
	var params={screen_name:'utcodingbotcamp'};
	client.get('statuses/user_timeline',params, function(error, tweets, response) {
		if (!error && response.statusCode === 200) {
    		for(var i=0;i<20;i++){
    			console.log("'"+tweets[i].text+"' was tweeted at "+tweets[i].created_at
    				+"\n-------");
    		}
  		}
	});

}

//spotify-this-song
function spotifyThis(value){
	spotify.search({ type: 'track', query: value }, function(err, data) {
  if (err) {
  	console.log("Song Not Found. Try this one:");
    spotify.request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
    .then(function(data) {
    console.log("Artist: "+data.artists[0].name
    				+"\nSong Name: "+data.name
    				+"\nSpotify Link: "+data.external_urls.spotify
    				+"\nAlbum Name: "+data.album.name
    				+"\n-------"
    			); 
  			});
  	}
 	else{
    	for(var i=0;i<10;i++){
    		console.log("Artist: "+data.tracks.items[i].artists[0].name
    			+"\nSong Name: "+data.tracks.items[i].name
    			+"\nSpotify Link: "+data.tracks.items[i].external_urls.spotify
    			+"\nAlbum Name: "+data.tracks.items[i].album.name
    			+"\n-------"
    			);
    	}

	}

	});
}

//movie-this

function findMovie(value){

	console.log(value);

	var queryUrl = "http://www.omdbapi.com/?t=" + value+ "&y=&plot=short&apikey=trilogy";

	request(queryUrl, function(error, response, body) {
// gets Mr. Nobody
	if(value===undefined){
		queryUrl = "http://www.omdbapi.com/?i=tt0485947&y&plot=short&apikey=trilogy";

		request(queryUrl, function(error, response, body) {

		console.log("You didn't search for anything. We suggest this movie.Title: " + JSON.parse(body).Title
    			+"\nYear: " + JSON.parse(body).Year
    			+"\nImdb Rating: " + JSON.parse(body).imdbRating
    			+"\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value
    			+"\nProduced in: "+JSON.parse(body).Country
    			+"\nLanguage: " + JSON.parse(body).Language
    			+"\nPlot: " + JSON.parse(body).Plot
    			+"\nCast: " + JSON.parse(body).Actors
    			+"\n-------"
    	);
	});
}


  else if (!error && response.statusCode === 200) {
//not all movies have a rotten tomatoes score. this function checks if rotten tomatoes is in the corret position. if not it will say n/a for that score
  	
  	var test=JSON.parse(body).Ratings;
  	var length=test.length;

  	if(length>1){

		var tomato=JSON.parse(body).Ratings[1].Source;
	

  		if(tomato==="Rotten Tomatoes"){

    		console.log("Title: " + JSON.parse(body).Title
    			+"\nYear: " + JSON.parse(body).Year
    			+"\nImdb Rating: " + JSON.parse(body).imdbRating
    			+"\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value
    			+"\nProduced in: "+JSON.parse(body).Country
    			+"\nLanguage: " + JSON.parse(body).Language
    			+"\nPlot: " + JSON.parse(body).Plot
    			+"\nCast: " + JSON.parse(body).Actors
    	);
  		}
  		else{
  			console.log("Title: " + JSON.parse(body).Title
    			+"\nYear: " + JSON.parse(body).Year
    			+"\nImdb Rating: " + JSON.parse(body).imdbRating
    			+"\nRotten Tomatoes Rating: N/A"
    			+"\nProduced in: "+JSON.parse(body).Country
    			+"\nLanguage: " + JSON.parse(body).Language
    			+"\nPlot: " + JSON.parse(body).Plot
    			+"\nCast: " + JSON.parse(body).Actors
    	);


  		}
  	}

  	else{

  		console.log("Title: " + JSON.parse(body).Title
    			+"\nYear: " + JSON.parse(body).Year
    			+"\nImdb Rating: " + JSON.parse(body).imdbRating
    			+"\nRotten Tomatoes Rating: N/A"
    			+"\nProduced in: "+JSON.parse(body).Country
    			+"\nLanguage: " + JSON.parse(body).Language
    			+"\nPlot: " + JSON.parse(body).Plot
    			+"\nCast: " + JSON.parse(body).Actors
    	);

  	}
  }
});


}

//do-what-it-says
//Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
//Feel free to change the text in that document to test out the feature for other commands.

function readFile(){

	fs.readFile("random.txt", "utf8", function(error, data) {

  if (error) {
    return console.log(error);
  }
  var dataArr = data.split(",");
  doSomething(dataArr[0],dataArr[1]);

});

}
//create and log to log.txt use append




