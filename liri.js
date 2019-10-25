require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

switch (process.argv[2]) {
    case "concert-this":
        concertThis(process.argv[3]);
        appendToFile(process.argv[2], process.argv[3]);
        break;
    case "spotify-this-song":
        spotifyThis(process.argv[3]);
        appendToFile(process.argv[2], process.argv[3]);
        break;
    case "movie-this":
        movieThis(process.argv[3]);
        appendToFile(process.argv[2], process.argv[3]);
        break;
    case "do-what-it-says":
        doWhatItSays();
        appendToFile(process.argv[2], process.argv[3]);
        break;
    default:
        console.log("you didn't specify any pre-selected command");
}

function concertThis(arg) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + arg + "/events?app_id=codingbootcamp";
    axios
        .get(queryUrl)
        .then((res) => {
            // console.log(queryUrl);
            // console.log(res.data[0]);
            console.log("Venue name: ", res.data[0].venue.name);
            console.log("Location: " + res.data[0].venue.city + ", " + res.data[0].venue.region);
            console.log("Time; ", moment(res.data[0].datetime).format("MM/DD/YYYY"));
        })
        .catch((err) => {
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else if (err.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(err.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", err.message);
            }
            console.log(err.config);
        });
}

function spotifyThis(arg) {
    if (arg) {
        spotify.search({ type: 'track', query: arg }, (err, data) => {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var info = data.tracks.items;
            // console.log(info);
            for (var i = 0; i < info.length; i++) {
                // Object.keys(info[i]).map(console.log(info[i].artists.name));
                console.log("Artist(s): ", info[i].artists.map(artist => artist.name).join(', '));
                console.log("Song Name: ", info[i].name);
                console.log("Preview link: ", info[i].preview_url);
                console.log("Album Name: ", info[i].album.name);
            }
            // console.log(data);
        });
    } else {
        spotify.search({ type: 'track', query: "The Sign" }, (err, data) => {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var info = data.tracks.items;
            // console.log(info);
            for (var i = 0; i < info.length; i++) {
                // Object.keys(info[i]).map(console.log(info[i].artists.name));
                console.log("Artist(s): ", info[i].artists.map(artist => artist.name).join(', '));
                console.log("Song Name: ", info[i].name);
                console.log("Preview link: ", info[i].preview_url);
                console.log("Album Name: ", info[i].album.name);
            }
            // console.log(data);
        });
    }
}

function movieThis(arg) {

    if (arg) {
        var queryUrl = "http://www.omdbapi.com/?t=" + arg + "&y=&plot=short&apikey=trilogy";
        axios
            .get(queryUrl)
            .then((res) => {
                var info = res.data;
                // console.log(info);
                console.log("Title: ", info.Title); // console.log("Title: ", res.data.Title); //display the other info
                console.log("Year: ", info.Year); // console.log("Year: ", res.data.Year);
                console.log("IMDB Rating: ", info.imdbRating); // console.log("IMDB Rating: ", res.data.imdbRating);
                console.log("Rotten Tomatoes: ", info.Ratings[1].Value); // console.log("Rotten Tomatoes Rating: ", res.data.Ratings[1].Value);
                console.log("Country: ", info.Country); // console.log("Country: ", res.data.Country);
                console.log("Language: ", info.Language); // console.log("Language: ", res.data.Language);
                console.log("Plot: ", info.Plot); // console.log("Plot: ", res.data.Plot);
                console.log("Actors: ", info.Actors); // console.log("Actors: ", res.data.Actors);
            })
            .catch((err) => {
                if (err.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                } else if (err.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(err.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", err.message);
                }
                console.log(err.config);
            });
    } else {
        axios
            .get("http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy")
            .then((res) => {
                var info = res.data;
                // console.log(info);
                console.log("Title: ", info.Title); // console.log("Title: ", res.data.Title); //display the other info
                console.log("Year: ", info.Year); // console.log("Year: ", res.data.Year);
                console.log("IMDB Rating: ", info.imdbRating); // console.log("IMDB Rating: ", res.data.imdbRating);
                console.log("Rotten Tomatoes: ", info.Ratings[1].Value); // console.log("Rotten Tomatoes Rating: ", res.data.Ratings[1].Value);
                console.log("Country: ", info.Country); // console.log("Country: ", res.data.Country);
                console.log("Language: ", info.Language); // console.log("Language: ", res.data.Language);
                console.log("Plot: ", info.Plot); // console.log("Plot: ", res.data.Plot);
                console.log("Actors: ", info.Actors); // console.log("Actors: ", res.data.Actors);
            })
            .catch((err) => {
                if (err.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                } else if (err.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(err.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", err.message);
                }
                console.log(err.config);
            });
    }

}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", (err, data) => {
        if (err) {
            console.log("err: ", err);
        }
        var dataArr = data.split(",");
        if (dataArr[0] === "concert-this") {
            concertThis(dataArr[1]);
        }
        else if (dataArr[0] === "spotify-this-song") {
            spotifyThis(dataArr[1]);
        } else {
            movieThis(dataArr[1]);
        }
    });
}

function appendToFile(arg1, arg2) {
    fs.appendFile("log.txt", "\r\n" + arg1 + " " + arg2, (err) => {
        if (err) {
            return console.log("err: ", err);
        }
    });
}
