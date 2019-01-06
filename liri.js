require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');

// * You'll use Axios to grab data from the 
// [OMDB API](http://www.omdbapi.com) and the 
// [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

var command = process.argv[2];
var searchValue = process.argv[3]

for (var i = 4; i < process.argv.length; i++) {
    if (i < process.argv.length) {
        searchValue = searchValue + " ";
    }
    searchValue = searchValue + process.argv[i];

}


switch (command) {
    case `concert-this`:
        bandsInTown(searchValue);
        break;
    case `spotify-this-song`:
        spotifyThisSong(searchValue)
        //   console.log(keys.spotify.id + " " + keys.spotify.secret);
        break;
    case `movie-this`:
        //call function
        break;
    case `do-what-it-says`:
        //call function
        break;
    default:
        text = "Command isn't supported";
}

function bandsInTown(artist) {
    var queryUrl = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;
    // console.log(queryUrl);
    axios
        .get(queryUrl)
        .then(function (response) {
            // Object.keys(response).forEach(key => {        
            // console.log(response["data"]);
            //}
            var length = response["data"].length;
            if (length == 0) {
                console.log(`No events found for: ${artist}`);
            }
            else {
                for (var x = 0; x < length; x++) {
                    var venue = response["data"][x].venue;
                    var date = response["data"][x].datetime;
                    console.log("Name of the venue: " + venue.name);
                    console.log("Venue city: " + venue.city);
                    if (venue.region) { console.log("Region: " + venue.region) }
                    console.log("Country: " + venue.country);
                    console.log("Date: " + date.slice(0, 4) + '/' + date.slice(5, 7) + '/' + date.slice(8, 10))
                    console.log('\n');
                }
            }
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                //console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                // console.log("Error", error.message);
            }
            //  console.log(error.config);
        });
}

function spotifyThisSong(track) {

    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });

    spotify.search({ type: 'track', query: track, limit: 10 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (var y = 0; y < data.tracks.items.length; y++) {
            var info = data.tracks.items[y];
            process.stdout.write(`Song title: ${info.name}`)  //title
            process.stdout.write("\n")  //newline
            for (var kk = 0; kk < info.artists.length; kk++) {                 
                console.log(`Artist(s): ${info.artists[kk].name}`); //artist                
            }
            console.log("\n");                        
        }
        //   console.log(data.tracks.items.length )

        //   var songInfo = data.tracks.items[0];
        //   var songResult = console.log(songInfo.artists[0].name)
        //                    console.log(songInfo.name)
        //                    console.log(songInfo.album.name)
        //                    console.log(songInfo.preview_url)
        //   console.log(songResult);   

        });
}