var express = require('express');
const logger = require('../src/Logger');
const QuestionsController = require('../Controller/QuestionsController');
const { ObjectId } = require('mongodb');
// var users = require('../Controller/UsersController');
var router = express.Router();

router.post('/', async (req, res) => {
    var formId = req.body.formId;
    var questionChanges = req.body.questionChanges;
    console.log(formId, questionChanges);
    var response = await QuestionsController.QuestionUpdation(formId, questionChanges);
    res.send(response);
});

module.exports = router;
