var http = require('http')
  ,https = require('https')
  ,fs = require('fs'),json;

var GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

var TABLE_ID = "1epTUiUlv5NQK5x4sgdy1K47ACDTpHH60hbng1qw";
//var TABLE_ID ="1obpi0bmSDILX1cIQcVRNi1lUkm2K5xBFztmRFiM"

var GOOGLE_PATH = "/fusiontables/v1/query?sql=SELECT%20*%20FROM%20"+TABLE_ID+"&key="+GOOGLE_API_KEY
var GOOGLE_DRIVE_PATH = "/drive/v2/files/"+TABLE_ID+"?key="+GOOGLE_API_KEY

var options = {
  hostname: 'www.googleapis.com',
  port: 443,
  method: 'GET',
};




http.createServer(function (req, res) {
    var file = fs.createWriteStream("../data/chapters.json");
    var clientRes = res;
    clientRes.writeHead(200, {'Content-Type': 'application/json', 
    "Access-Control-Allow-Origin": "*"});
    clientRes["modifiedDate"] = "2012-12-04T18:51:12.762Z";
    options["path"] = GOOGLE_PATH;
    var req = https.request(options, function(res) {
        res.on('data', function(data) {
            clientRes.write(data, 'utf8');
            file.write(data);
        }).on('end', function() {
        // send the JSON here
        clientRes.end(json);
        file.end();
        });
    });
    req.end();
    req.on('error', function(e) {
        console.error(e);
    });

}).listen(process.env.VMC_APP_PORT || 9080, null);
