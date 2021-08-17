var express = require('express');
const logger = require('../src/Logger');
const SurveyDataCollector = require('../Controller/SurveyDataCollectorController');
var router = express.Router();

//Adding Questions and Answers 
//This will be used for updating, Adding and storying questions and Answers 
router.post('/UpdateQandA', async function (req, res) {
    logger.info("Starting Execution of /UpdateQandA post request}");
    var response = false;
    var userName = req.body.userName;
    var formId = req.body.formId;
    var questionChanges = req.body.questionChanges;
    responses = [];
    // This will parallely execute tasks on the Server
    await Promise.all(questionChanges.map(async (element) => {
        console.log(element.QuestionId, userName, formId);
        var response = await SurveyDataCollector.UpdateQandA(userName, formId, element);
        console.log("response from the server", response);
        responses.push(response);
    }));
    res.send(responses);
});


//Deleting Questions and Answers 
//This will be used for deleting and storying questions and Answers 
router.delete('/DeleteQandA', async function (req, res) {
    logger.info("Starting Execution of /DeleteQandA delete request}");
    var response = false;
    var userName = req.body.userName;
    var formId = req.body.formId;
    var quesitonId = req.body.quesitonId;
    console.log(userName, formId, quesitonId);
    var response = await SurveyDataCollector.DeleteQandA(userName, formId, quesitonId);
    res.send(response);
});

//Delete From 
router.delete('/DeleteForm', async function (req, res) {
    logger.info("Starting Execution of /DeleteForm delete request}");
    var response = false;
    var userName = req.body.userName;
    var formId = req.body.formId;
    var response = await SurveyDataCollector.DeleteFrom(userName, formId);
    res.send(response);
});


router.post('/verifyUserIdFormId', async function (req, res) {
    logger.info("Starting Execution of /UpdateQandA post request}");
    var response = false;
    var userName = req.body.userName;
    var formId = req.body.formId;
    console.log(userName, formId);
    var response = await SurveyDataCollector.verifyUserIdFormId(formId, userName);
    res.send(response);
});




//Updating Questions and Answers 

// Deleting Questions and Answers
// Deleing Questions and Answers for a form 
// Getting Questions and Answers for a form 


module.exports = router;