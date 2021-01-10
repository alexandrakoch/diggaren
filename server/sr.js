const http = require('http');
const convert = require('xml-js');

module.exports = {
    getCurrentSong: function(channelID) {
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
}