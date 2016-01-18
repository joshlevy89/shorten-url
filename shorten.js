var express = require('express');
var app = express();
var crypto = require('crypto');
var validUrl = require('valid-url');
var path = require('path');

app.set('view engine', 'jade')
app.set('views', path.join(__dirname, '/public'));

app.get('/',function(req,res){
   res.send('Append the url to be shortened to the current url: e.g. .../new/https://www.google.com'); 
});
app.get('/new/*',function(req,res){ // allow anything after the new path
    var query = req.params['0'];
   if (validUrl.isUri(query)){
        var hash = crypto.createHash('sha1').update(query, 'utf64').digest('hex').substring(0,5);
        var short = 'https://www.joshlevy89.com/' + hash;
        var o = {
            original_url: query,
            shortened_url: short
        };
        res.render('response', {results: o});
    } else {
        res.send({"error":"URL invalid"});
    }
});

app.listen(process.env.PORT);