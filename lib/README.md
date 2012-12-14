# Node.js script used to pull the data from Google Fusion Table

This is deployed at AppFog [http://chapters.zmgc.net](http://chapters.zmgc.net) and returns json

#Google API Key

1. Obtain valid key: 1. visit https://code.google.com/apis/console
2. Select 'Services' on the left, enable 'fusion tables'
3. Select 'API access' on the left, tap "Create new server key...", it can take some time
4. Create an env variable in your bashrc, zshrc, called GOOGLE_API_KEY
    export GOOGLE_API_KEY=YOUR API KEY
    
    $ echo $GOOGLE_API_KEY
    your google id should be displayed

#Install and run

    $ npm install
    $ node app.js
    
Open your browser and point it to [http://localhost:9080/](http://localhost:9080/)

# TODO

1. Check if GFT has been updated and cache the results, so that we don't make any calls

    [APIs Explorer](https://developers.google.com/apis-explorer/#p/drive/v2/drive.files.get?fileId=1epTUiUlv5NQK5x4sgdy1K47ACDTpHH60hbng1qw&_h=2&)
    
2. Use node-github to upload the chapters.json file to the gh-pages repository, if the original Fusion Table has been updated.

#References

https://developers.google.com/fusiontables/docs/samples/basic_jsonp_request