require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");

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
}

function concertThis(arg) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + argv + "/events?app_id=codingbootcamp";
    axios
        .get(queryUrl)
        .then((res) => {
            console.log(res); //findout the data structure
        })
        .catch((err) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

function movieThis(arg) {
    var queryUrl = "http://www.omdbapi.com/?t=" + arg + "&y=&plot=short&apikey=trilogy";
    axios
        .get(queryUrl)
        .then((res) => {
            console.log(res.data.Year); //display the other info
        })
        .catch((err) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
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
        else if (dataArr[0] === "spotify-this-song"){
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
