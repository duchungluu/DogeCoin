var express = require('express');

var app = express();

app.get('/',function(req, res){
    res.send('Hello my cryptonite!');
});

app.listen(3000, function(){
    console.log('Listing on port 3000');
});