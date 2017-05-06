var express = require('express'),
    end = require('./routes/endpointInterface'),
    bodyParser= require('body-parser');
 

var app = express();
var db
 app.use(bodyParser.json());

//app.use(express.logger('dev')); 
 app.get('/getAllendpoint', end.findAll);
 app.get('/getendpoint/:id', end.findBykey);
 app.post('/endpoint', end.addEndPoint);
 app.put('/endpoint/:id', end.updateEndPoint);
 app.delete('/deleteendpoint/:id', end.deleteEndPoint);
 app.delete('/deleteAllendpoints', end.deleteAllEndPoint);

app.listen(3000);
console.log('Listening on port 3000...');