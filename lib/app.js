var http = require('http')
  ,https = require('https')
  ,fs = require('fs'),json;

var GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

var FUSION_TABLE_ID = "1epTUiUlv5NQK5x4sgdy1K47ACDTpHH60hbng1qw";

var GOOGLE_PATH = "/fusiontables/v1/query?sql=SELECT%20*%20FROM%20"+FUSION_TABLE_ID+"&key="

var options = {
  hostname: 'www.googleapis.com',
  port: 443,
  path: GOOGLE_PATH+GOOGLE_API_KEY,
  method: 'GET'
};

http.createServer(function (req, res) {
  var clientRes = res;
  clientRes.writeHead(200, {'Content-Type': 'application/json'});
  var req = https.request(options, function(res) {
    res.on('data', function(data) {
      clientRes.write(data, 'utf8');
    }).on('end', function() {
      // send the JSON here
      clientRes.end(json);
    });
  });
  req.end();
  req.on('error', function(e) {
    console.error(e);
  });

}).listen(process.env.VMC_APP_PORT || 9080, null);
