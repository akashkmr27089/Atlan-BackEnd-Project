var url = process.env.DB_URL;
const logger = require("../src/Logger");
var MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
var database = process.env.DATABASE;


async function GetAnswer(id) {
    return new Promise(resolve => {
        MongoClient.connect(url, (err, db) => {
            if (err) {
                logger.error(err.message);
                db.close();
                // resolve({ response: false, Message: err.message });
            } else {
                var querry = { AnswerId: id }
                var dbo = db.db(database)
                dbo.collection("AnsOptions").findOne(querry, (error, results) => {
                    if (error) {
                        logger.error(error.message);
                        db.close();
                        resolve({})
                        // resolve({ response: false, Message: err.message });
                    } else {
                        if (results != undefined) {
                            // console.log("Results Answer", results)
                            var data = {
                                AnswerId: id, AnswerOptions: results.AnswerOptions, AnswerType: results.AnswerType,
                                CorrectOption_min: results.CorrectOption_min, CorrectOption_max: results.CorrectOption_max
                            }
                            resolve(data);
                            db.close();
                        } else {
                            resolve({});
                        }
                    }
                })
            }
        });
    });
}

async function GetQuestionData(id) {
    return new Promise(resolve => {
        // resolve(`Not Implemented ${id}`)
        // Get Questions from the Question Database and use that to get Answer too 
        MongoClient.connect(url, (err, db) => {
            if (err) {
                logger.error(err.message);
                db.close();
                // resolve({ response: false, Message: err.message });
            } else {
                var dbo = db.db(database);
                var querry = { QuestionId: id }
                // resolve({ response: false, Message: err });
                var responses = [];
                dbo.collection("Questions").findOne(querry, async (err, res) => {
                    if (err) {
                        logger.error(err.message);
                        db.close();
                        // resolve({ response: false, Message: err.message });
                    } else {
                        if (res != undefined) {
                            responses.push({
                                Questionid: res.QuestionId, Question: res.Question, QuestionMeta: res.QuestionMeta,
                                AnswerType: res.AnswerType
                            });
                            var querry = { AnswerId: res.AnswerId }
                            console.log("Querry", querry)
                            var ansResponse = await GetAnswer(res.AnswerId);
                            responses.push(ansResponse);
                        }
                    }
                    resolve(responses)
                    // console.log("Results", res, responses);
                });
            }
        });
    });
}

// This Function is Responsible for Getting All the Data from the Server 
function getData(formId) {
    var FormId = ObjectId(formId);
    return new Promise(resolve => {
        MongoClient.connect(url, (err, db) => {
            if (err) {
                logger.error(err.message);
                db.close();
                resolve({ response: false, Message: err.message });
            }
            var dbo = db.db(database);
            var querry = { _id: FormId }
            // console.log(querry);
            dbo.collection("Forms").findOne(querry, async (err, result) => {
                if (err) {
                    logger.error(err.message);
                    db.close();
                    resolve({ response: false, Message: err.message });
                }
                if (result == undefined) {
                    // console.log("Not there in database");
                    resolve({ response: true, res: result })
                } else {
                    // console.log("There in database");
                    var responses = [];

                    await Promise.all(result.questionAnsId.map(async (element) => {
                        var response = await GetQuestionData(element.QuestionId);
                        responses.push(response);
                    }));
                    // Response form the server and add it to response 

                    resolve({ response: true, Response: responses })
                }
            });
        })
    });
}

//function to see if the uniqeId and fromId with submit exists 
async function surveyValidity(formId, uniqueId) {
    return new Promise(resolve => {
        MongoClient.connect(url, (err, db) => {
            if (err) {
                logger.error(err.message);
                db.close();
            } else {
                logger.info("Connection Establised with the MongoDb");
                var dbo = db.db(database);
                var querry = { uniqueId: uniqueId, formId: formId }
                dbo.collection("Response").findOne(querry, (err, result) => {
                    if (err) {
                        logger.error(err.message);
                        resolve({ response: false, status: -1 })
                        db.close();
                    } else {
                        console.log(result);
                        if (result == undefined) {
                            // Form Does Not Exists => Status  = 0
                            resolve({ response: false, status: 0 });
                        } else {
                            // Form Exists 
                            if (result.submit == 1) {
                                // Form Exists and its already filled
                                resolve({ response: false, status: 1 })
                                //Function to Send the Data for Notification
                            } else {
                                // Form Exists and its not filled yet
                                resolve({ response: true, status: 0 })
                            }
                        }
                    }
                });
            }
        });
    });
}

async function ResposeDataHandler(formId, uniqueId, dataEntry, submit, phoneNumber) {
    return new Promise(resolve => {
        MongoClient.connect(url, (err, db) => {
            if (err) {
                logger.error(err.message);
                db.close();
            } else {
                var dbo = db.db(database);
                var querry = { formId: formId, uniqueId: uniqueId }
                var updateEntry = { $set: { QuestionStack: dataEntry, submit: submit } }
                dbo.collection("Response").findOne(querry, (err, res) => {
                    if (err) {
                        logger.error(err.message);
                        db.close();
                    } else {
                        if (res == undefined) {
                            var data = { formId: formId, uniqueId: uniqueId, QuestionStack: dataEntry, submit: submit, phoneNumber: phoneNumber }
                            dbo.collection("Response").insertOne(data, (err, results) => {
                                if (err) {
                                    logger.error(err.message);
                                    resolve({ response: false })
                                } else {
                                    logger.info("Question Stack Updated")
                                    resolve({ response: true, data: data, results: results })
                                }
                            });
                        } else {
                            dbo.collection("Response").updateOne(querry, updateEntry, (err, res) => {
                                if (err) {
                                    logger.error(err.message);
                                    resolve({ response: false })
                                } else {
                                    logger.info("Question Stack Updated")
                                    resolve({ response: true, data: data, results: res })
                                }
                            });
                        }
                    }
                })
            }
        });
    });
}

//The Function to send response based on QuestionsId and its Answer 
async function sendData(formId, uniqueId, dataEntry, submit, phoneNumber) {
    // In the Survey DataEntry, store the data with some unique id and the data 
    // {uniqueId:"##", DataEntry: {}, tags:{}, submit: bool}
    return new Promise(async resolve => {
        var response = await surveyValidity(formId, uniqueId);
        console.log("Response from the Form", response);
        if ((response.response == false && response.status == 0) || (response.response == true && response.status == 0)) {
            var data = await ResposeDataHandler(formId, uniqueId, dataEntry, submit, phoneNumber)
            resolve({ response: true, data: data })
        } else {
            // Do Nothing Just Returned form is already Submitted 
            resolve({ response: false, Message: "The document is already Submitted" });
        }
        resolve(response);
    });
}

async function getSubmittedData(formId, uniqueId) {
    return new Promise(resolve => {
        MongoClient.connect(url, (err, db) => {
            if (err) {
                logger.error(err.message);
                resolve({ response: false })
                db.close();
            } else {
                var querry = { formId: formId, uniqueId: uniqueId }
                var dbo = db.db(database);
                dbo.collection("Response").findOne(querry, (err, result) => {
                    if (err) {
                        logger.error(err.message);
                        resolve({ response: false })
                        db.close();
                    } else {
                        resolve({ result: result })
                    }
                })
            }
        });
    });
}

module.exports = {
    getData: getData,
    sendData: sendData,
    getSubmittedData: getSubmittedData
}