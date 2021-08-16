var url = process.env.DB_URL;
const logger = require("../src/Logger");
var MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
var database = process.env.DATABASE;

// Function Responsible for Updating Questions and 
function QuestionUpdation(formId, Qdata) {
    return new Promise(resolve => {
        var FormId = ObjectId(formId);
        MongoClient.connect(url, (err, db) => {
            if (err) {
                logger.error({ response: false, message: err.message });
                resolve({ response: false, message: err.message });
            } else {
                var dbo = db.db(database);
                var querry = { formId: FormId, QuestionId: Qdata.QuestionId };
                var updateRes = { $set: { formId: FormId, QuestionId: Qdata.QuestionId } }; // Need to work on The Updation Script 
                dbo.collection("Questions").findOne(querry, (err, res) => {
                    if (err) {
                        logger.error({ response: false, message: err.message });
                        resolve({ response: false, message: err.message });
                        db.close();
                    } else {
                        if (res == undefined) {
                            logger.error(res, "No Entry in the Database");
                            //Insert Data Into Database
                            var ansId = (Qdata.AnswerId != "") ? Qdata.AnswerId : `${Date.now() + Math.floor(Math.random() * 100)}`;
                            var QNewData = {
                                QuestionId: Qdata.QuestionId, Question: Qdata.Question, QuestionMeta: Qdata.QuestionMeta,
                                AnswerId: ansId, AnswerType: Qdata.AnswerType, formId: FormId
                            };
                            // Inserting Data Into Question DataBase 
                            dbo.collection("Questions").insertOne(QNewData, (err, result) => {
                                if (err) {
                                    logger.error({ response: false, message: err.message });
                                    resolve({ response: false, message: err.message });
                                } else {
                                    logger.info("New Question Inserted into the Database");
                                    console.log("Question Inserted Data", result)
                                    resolve({ response: true, message: "Question inserted into database" });
                                }
                            });
                            //Inserting data to AnsOption Database 
                            if (Qdata.AnswerType == "Option") {
                                var ANewData = {
                                    formId: FormId, AnaswerId: ansId, AnswerOptions: Qdata.AnswerOptions, AnswerType: Qdata.AnswerType,
                                    CorrectOption_min: 1, CorrectOption_max: 1
                                }
                                dbo.collection("AnsOptions").insertOne(ANewData, (err, res) => {
                                    if (err) {
                                        logger.error({ response: false, message: err.message });
                                        resolve({ response: false, message: err.message });
                                    } else {
                                        logger.info("New Answer Inserted into the Database");
                                        console.log("Answer Inserted Data", res)
                                        resolve({ response: true, message: "New Entry Created" });
                                    }
                                })
                            }
                        } else {
                            // Modify Data Into Databse 
                            logger.info(`Question entry with parameter ${querry} exists in the database`);
                            //First Update the Database if there is Any Changes
                            var QNewData = {
                                $set: {
                                    Question: Qdata.Question, QuestionMeta: Qdata.QuestionMeta,
                                    AnswerType: Qdata.AnswerType
                                }
                            };
                            var querry = { formId: FormId, QuestionId: Qdata.QuestionId };
                            dbo.collection("Questions").updateOne(querry, QNewData, (err, res) => {
                                if (err) {
                                    logger.error({ response: false, message: err.message });
                                    resolve({ response: false, message: err.message });
                                } else {
                                    logger.info("New Answer Updated into the Database");
                                    console.log("Answer Updated Data", res)
                                    resolve({ response: true, message: "New Entry Updated", res: res });
                                }
                            });
                            //Updating Answer Updatation
                            if (Qdata.AnswerType == 'Option') {
                                var ANewData = {
                                    $set: {
                                        AnswerOptions: Qdata.AnswerOptions, AnswerType: Qdata.AnswerType,
                                        CorrectOption_min: 1, CorrectOption_max: 1
                                    }
                                }
                                var querry = {
                                    formId: FormId, AnswerId: ansId
                                }
                                dbo.collection("AnsOptions").updateOne(querry, ANewData, (err, res) => {
                                    if (err) {
                                        logger.error({ response: false, message: err.message });
                                        resolve({ response: false, message: err.message });
                                    } else {
                                        logger.info("New Answer Updated into the Database");
                                        console.log("Answer Updated Data", res)
                                        resolve({ response: true, message: "New Entry Updated", res: res });
                                    }
                                })
                            } else {
                                // If its changed to NoOption then delete that entry in the database 
                            }
                            // Check if Answer Option is Option ==> Check if data is there is Answer 

                        }
                    }
                });
            }
        })
    });;

}

module.exports = {
    QuestionUpdation: QuestionUpdation
}