var express = require('express');
var opener = require('opener');

var app = express();

app.use(express.static(__dirname));

app.listen(3235, function () {
    console.log('Static app listening on port 3235!');

    opener('http://localhost:3235');  
});