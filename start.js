var express = require('express');
var app = express();
const port = require('./port/port');
const routes = require('./routes/index');
var bodyParser = require('body-parser');
const fs = require('fs');

app.set('port', process.env.PORT || port);

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/api/',routes);
app.use('/storage/',express.static(__dirname+'/storage'));


app.get('/', function(req, res){


});


// пользовательская страница 500
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');

});
app.listen(app.get('port'));