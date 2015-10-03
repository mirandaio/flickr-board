var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.static('bower_components'));

app.listen(port);
