const http = require('http');
const convert = require('xml-js');
const url = require('url');

function getCurrentSong(channelID) {
    //return a Promise object
    return new Promise(function (resolve, reject) {
        const options = {
            host: 'api.sr.se',
            path: '/api/v2/playlists/rightnow?channelid=' + channelID
        };
        const xmlOptions = {ignoreComment: true, alwaysChildren: false};
        const req = http.request(options, res => {
            res.on('data', function (data) {
                //convert the result to a JSON object
                let result = convert.xml2json(data, xmlOptions);
                resolve(result);
            });
            res.on('end', function () {

            });
            res.on('error', function(error) {
                reject(error);
            })
        });
        req.end();
    });
}

http.createServer(function (req, res) {
    const reqURL = url.parse(req.url, true);
    //if the URL matches the api url pattern
    if (reqURL.pathname === "/api/getsong") {
        const urlParams = reqURL.query;
        const channelID = urlParams['id'].toString();
        getCurrentSong(channelID).then(function (song) {
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
