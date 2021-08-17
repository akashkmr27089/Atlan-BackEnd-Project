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

module.exports = router;
