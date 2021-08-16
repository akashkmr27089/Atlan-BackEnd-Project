var express = require('express');
const logger = require('../src/Logger');
var router = express.Router();

// Home page route.
router.post('/CreatForm', function (req, res) {
    console.log(req);
    res.send('Wiki home page');
})

// About page route.
router.get('/', function (req, res) {
    res.send('About this wiki');
})

module.exports = router;
