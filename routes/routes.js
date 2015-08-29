var express = require('express');
var router = express.Router();

var textHandler = require('../handlers/text.handler');

router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next(); 
});

router.get('/get', textHandler.getText);
router.get('/', function(req, res) {
    res.redirect('/#/docs');
});

router.use('/*', function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})

module.exports = router;
