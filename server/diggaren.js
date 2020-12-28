var http = require('http');
var convert = require('xml-js');

function getCurrentSong(channelID) {
  var options = {
    host: 'api.sr.se',
    path: '/api/v2/playlists/rightnow?channelid='+channelID
}

var xmlOptions = {ignoreComment: true, alwaysChildren: false};
var request = http.request(options, function (res) {
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        var result = convert.xml2json(data, xmlOptions);
        console.log(result);
    });
});
request.on('error', function (e) {
    console.log(e.message);
});
request.end();
}

getCurrentSong(164)
