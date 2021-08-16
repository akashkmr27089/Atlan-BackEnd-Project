var express = require('express');
const logger = require('../src/Logger');
var router = express.Router();
var users = require('../Controller/UsersController');

// Creates User into Database
router.post('/', async function (req, res) {
    logger.info("Attempting to create user");
    var response = false;
    var userName = req.body.userName
    if (userName != undefined) {
        console.log(userName);
        var response = await users.CreateUser(userName);
    } else logger.error("Post /user Bad Request");
    res.send(response);
});

// Get Information about the User
router.post('/IfUserExists', async function (req, res) {
    logger.info("Attempting to verify User if it exists");
    var response = false;
    var userName = req.body.userName
    if (userName != undefined) {
        console.log(userName);
        var response = await users.IfUserExists(userName);
    } else logger.error("Post /user Bad Request");
    res.send(response);
});

module.exports = router;
