var https = require('https');
var fs = require('fs');

// to obtain valid key: 1. visit https://code.google.com/apis/console
// 2. select 'Services' on the left, enable 'fusion tables'
// 3. select 'API access' on the left, tap "Create new server key...", it can take some time
// 4. paste it into googleApiKey
var   googleApiKey = '';

var options = {
  hostname: 'www.googleapis.com',
  port: 443,
  path: "/fusiontables/v1/query?sql=SELECT%20*%20FROM%201epTUiUlv5NQK5x4sgdy1K47ACDTpHH60hbng1qw&key="+googleApiKey,
  method: 'GET'
};

var file = fs.createWriteStream("zgcontacts.json");
var req = https.request(options, function(res) {
  console.log("statusCode: ", res.statusCode);
  console.log("headers: ", res.headers);
  res.on('data', function(data) {
    file.write(data);
  }).on('end', function() {
    file.end();
    console.log("downloaded to zgcontacts.json");
  });
});
req.end();

req.on('error', function(e) {
  console.error(e);
});
