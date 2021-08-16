// Library Import and Initialisation
const express = require('express')
require('dotenv').config()
let bodyParser = require('body-parser');
const logger = require("./src/Logger");
var MongoClient = require('mongodb').MongoClient;
const app = express();
const FormFunction = require('./Controller/FormController');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Routes
var wiki = require('./MongoDbTest/Testing/wiki');
var form = require('./Routes/Form');
var user = require('./Routes/Users');

app.use('/wiki', wiki);
app.use('/Form', form);
app.use('/User', user);

//Global Variable Declaration
const port = process.env.PORT;
var url = process.env.DB_URL;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

//Main Routing
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/sendSms', (req, res) => {
    client.messages
        .create({
            body: 'This is Just a Test',
            from: '+18508163940',
            to: '+917083611162'
        })
        .then(message => res.send(message));
});

app.get('/getData', async (req, res) => {
    logger.info('Calling /getData Function');
    var data = await FormFunction.FetchData();
    logger.info('got response from /getData Function');
    res.send(data);
});

app.listen(port, () => {
    logger.info(`Example app listening at http://localhost:${port}`)
})