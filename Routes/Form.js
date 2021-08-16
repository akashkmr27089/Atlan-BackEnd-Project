var express = require('express');
const logger = require('../src/Logger');
const FormController = require('../Controller/FormController');
const { ObjectId } = require('mongodb');
// var users = require('../Controller/UsersController');
var router = express.Router();

// Home page route.
router.post('/CreatForm', function (req, res) {
    console.log(req);
    res.send('Wiki home page');
});

// About page route.
router.get('/', function (req, res) {
    res.send('About this wiki');
});

//Create Form 
router.post('/CreateForm', async (req, res) => {
    logger.info(`/CreateForm Post Endpont`)
    var userName = req.body.userName
    var response = await FormController.createForm(userName);
    console.log("DataOutput", response);
    res.send(response);
});

// Delete Form 
router.delete('/Delete', async (req, res) => {
    logger.info('/Delete delete Endpoint');
    var FormId = req.body.FormId;
    var data = ObjectId(FormId);
    var response = await FormController.deletForm(data);
    res.send(response);
});

module.exports = router;
