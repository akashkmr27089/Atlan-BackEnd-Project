var url = process.env.DB_URL;
const logger = require("../src/Logger");
var MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

var database = process.env.DATABASE;
const User = require('./UsersController');
const Form = require('./FormController');

// Function to Verify if the fromid is from the same userName 
async function verifyUserIdFormId(formid, userName) {
    console.log(userName)
    return new Promise(async resolve => {
        var response = await User.IfUserExists(userName);
        if (response.response == true) {
            logger.info("Found userName into database");
            MongoClient.connect(url, (err, db) => {
                if (err) {
                    logger.err(err.message);
                    resolve({ response: false, Message: err.message });
                    db.close();
                }
                else {
                    var FormId = ObjectId(formid);
                    var dbo = db.db(database);
                    var querry = { _id: FormId, userId: userName };
                    dbo.collection("Forms").findOne(querry, (err, res) => {
                        if (err) {
                            logger.error(err.message);
                            resolve({ response: false, Message: err.message });
                            db.close();
                        } else {
                            if (res == undefined) {
                                logger.error(`Form with id ${formid} not found not found for the given User`);
                                resolve({ response: false, Message: `Form with id ${formid} not found for the given User` });
                            } else {
                                logger.info("Found FormId into database");
                                console.log(res);
                                resolve({ response: true, Message: "Found FormId into database" });
                                db.close();
                            }
                        }
                    });
                }
            })
        }
        else {
            resolve({ response: false, Message: "No User Exists As Such" })
        }
    });
}


// Update Questions and Answers  
//Function takes userName and FormId and Questions and Answers and update to database 
// users UserName and FormId ==> then only user can update the Questions and Answers 
// This Also Take Cares for Addition and Modificaiton
async function UpdateQandA(userName, formId, questionAns) {
    logger.info("UpdateQandA Function called");
    return new Promise(async resolve => {
        var response = await verifyUserIdFormId(formId, userName);
        if (response.response) {
            logger.info("UserName and FormId combination is correct and found in database");
            //For this, first Enter the data Into Forms in an array and then enter data into Questions Table
            //Modify Only if data exists in the table 
            MongoClient.connect(url, (err, db) => {
                if (err) {
                    logger.error(err.message);
                    resolve({ response: false, Message: err.message });
                } else {
                    var dbo = db.db(database);
                    var FormId = ObjectId(formId);
                    var querry = { _id: FormId, userId: userName, "questionAnsId.QuestionId": questionAns.QuestionId };
                    // var querry = { "questionAnsId.grade": 80 };
                    console.log("Querry", querry);
                    dbo.collection("Forms").findOne(querry, (err, result) => {
                        if (err) {
                            resolve({ response: false, Message: err.message });
                        } else {
                            if (result == undefined) {
                                console.log("Result2 : ", result);
                                // Add the data into the database 
                                var updateData = [{ $set: { questionAnsId: { $concatArrays: ["$questionAnsId", [{ QuestionId: `${Date.now()}` }]] } } }];
                                var querryTemp = { _id: FormId, userId: userName, }
                                dbo.collection("Forms").updateOne(querryTemp, updateData, (err, result) => {
                                    if (err) {
                                        logger.error(err.message);
                                        resolve({ response: false, Message: err.message });
                                    } else {
                                        logger.info("Entry Added to the Form Database");
                                        console.log(result);
                                        //Adding Entry into the Questions and Answer Database
                                    }
                                });
                            } else {
                                //The data Exists on the Database
                                console.log("Result :", result);

                            }
                        }
                    });
                }
            })
            console.log(userName, formId, questionAns);
            resolve({ response: true, Message: "" });
        } else {
            logger.error("UserName and FormId combination is Wrong");
            resolve({ response: false, Message: "UserName and FormId combination is Wrong" });
        }
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
    verifyUserIdFormId: verifyUserIdFormId,
}