var express = require('express');

var port = 8888;
var routes = require('./routes/routes');

var app = express();

app.use('/', routes);

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status).send({error: err});
  });
}

app.use(function (req, res, next){
    res.status(404).send();
})

app.use(function(err, req, res, next) {
    console.log(err)
  res.sendStatus(err.status || 500);
});

app.listen(port, function(){
    console.log('--- SERVER ---');
    console.log('Port: ' + port);
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname  +
        '\nprocess.cwd = ' + process.cwd());    
});
