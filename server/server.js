const http = require('http');
const url = require('url');
const sr = require('./sr.js');

http.createServer(function (req, res) {
    const reqURL = url.parse(req.url, true);
    //if the URL matches the api url pattern
    if (reqURL.pathname === "/api/getsong") {
        const urlParams = reqURL.query;
        const channelID = urlParams['id'].toString();
        sr.getCurrentSong(channelID).then(function (song) {
            //write http header info
            res.writeHead(200, {
                'Content-Length': Buffer.byteLength(song),
                'Content-Type': 'application/json'
            });
            //return the json object from getCurrentSong and end the response
            res.write(song, function() { res.end(); });
        });
    }
    else {
        //else return a 404 error
        res.writeHead(404, {
            'Content-Length': Buffer.byteLength("404"),
            'Content-Type': 'text/plain'
        });
        res.write("404", function () {res.end()});
    }
}).listen(8080);
