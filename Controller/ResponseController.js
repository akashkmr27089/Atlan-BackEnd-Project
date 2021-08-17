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

module.exports = {
    getData: getData
}