var express = require('express');
const logger = require('../src/Logger');
var router = express.Router();
var Response = require("../Controller/ResponseController");

// With Only Form Id, return all the Questions and Answers
router.post('/', async (req, res) => {
    var formId = req.body.formId;
    var response = false;
    console.log(formId);
    var response = await Response.getData(formId);
    res.send(response);
});

//This is responsible for storying response from the Survey to db
router.post('/sendData', async (req, res) => {
    var formId = req.body.formId;
    var uniqueId = req.body.uniqueId;
    var dataEntry = req.body.dataEntry;
    var response = false;
    var submit = req.body.submit;
    console.log(formId, uniqueId, dataEntry, submit);
    var response = await Response.sendData(formId, uniqueId, dataEntry, submit);
    res.send(response);
});

// Get User Submitted data
//This is responsible for storying response from the Survey to db
router.post('/getSubmitted', async (req, res) => {
    var formId = req.body.formId;
    var uniqueId = req.body.uniqueId;
    var response = false;
    console.log(formId, uniqueId);
    var response = await Response.getSubmittedData(formId, uniqueId);
    res.send(response);
});


module.exports = router;
