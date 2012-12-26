var http = require('http')
  ,https = require('https')
  ,fs = require('fs')
  ,Kat = require('kat'),json;

var GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

var TABLE_ID = "1epTUiUlv5NQK5x4sgdy1K47ACDTpHH60hbng1qw";
//var TABLE_ID ="1obpi0bmSDILX1cIQcVRNi1lUkm2K5xBFztmRFiM"

var GOOGLE_PATH = "/fusiontables/v1/query?sql=SELECT%20*%20FROM%20"+TABLE_ID+"&key="+GOOGLE_API_KEY;
var GOOGLE_DRIVE_PATH = "/drive/v2/files/"+TABLE_ID+"?key="+GOOGLE_API_KEY;

var options = {
  hostname: 'www.googleapis.com'
  ,port: 443
  ,method: 'GET'
};

/**
 * Print a file's metadata.
 *
 * @param {String} fileId ID of the file to print metadata for.
 */
 
function mergeStreams(fileId) {
    options["path"] = GOOGLE_DRIVE_PATH;

    var file = fs.createWriteStream("../data/metadata.json");
    var req = https.request(options, function(res) {
      res.on('data', function(data) {
          //var tweet = JSON.parse(data);
          //console.log(tweet);
          file.write(data);
      }).on('end', function() {
          file.end();
          console.log("metadata.json created");
      });
    });
    req.end();

    req.on('error', function(e) {
      console.error(e);
    });
}

function MergeJSON (o, ob) {
    for (var z in ob) {
        o[z] = ob[z];
    }
    return o;
}

http.createServer(function (req, res) {
    mergeStreams(TABLE_ID);
    var file = fs.createWriteStream("../data/chapters.json");
    var clientRes = res;
    //var readstream = new Kat();
    clientRes.writeHead(200, {'Content-Type': 'application/json', 
    "Access-Control-Allow-Origin": "*"});
    options['path'] = GOOGLE_PATH;
    var clientReq = https.request(options, function(res) {
        //console.log(res);
        res.on('data', function(data) {
            //readstream.add(data);
            clientRes.write(data, 'utf8');
            file.write(data);
        }).on('end', function() {
        // send the JSON here
        clientRes.end(json);
        file.end();
        });
    });
    clientReq.end();
    clientReq.on('error', function(e) {
        console.error(e);
    });

}).listen(process.env.VMC_APP_PORT || 9080, null);
