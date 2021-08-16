var url = process.env.DB_URL;
const logger = require("../src/Logger");
var MongoClient = require('mongodb').MongoClient;
var database = process.env.DATABASE;
const User = require('./UsersController');
const Form = require('./FormController');

// Function to Verify if the fromid is from the same userName 
async function verifyUserIdFormId(userName, formid) {
    return new Promise(resolve => {
        resolve("Not Implemented");
    });
}

// Update Questions and Answers  
//Function takes userName and FormId and Questions and Answers and update to database 
// users UserName and FormId ==> then only user can update the Questions and Answers 
// This Also Take Cares for Addition and Modificaiton
async function UpdateQandA(userName, formId, questionAns) {
    return new Promise(resolve => {
        resolve("Not Implemented");
    });
}

// Delete Specific Quesitons and Answers
//This will delete a specific Question from the form 
//Input Validation from the dataase System for the username and FormId
async function DeleteQandA(userName, formId, quesitonId) {
    return new Promise(resolve => {
        resolve("Not Implemented");
    });
}

// Delete All Quesitons and Answers based on FormID
//This will delete a specific Question from the form 
//Input Validation from the dataase System for the username and FormId
async function DeleteFrom(userName, formId) {
    return new Promise(resolve => {
        resolve("Not Implemented");
    });
}

// Modifiy Questions 

module.exports = {
    UpdateQandA: UpdateQandA,
    DeleteQandA: DeleteQandA,
    DeleteFrom: DeleteFrom,
}