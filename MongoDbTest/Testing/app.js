// Library Import and Initialisation
const express = require('express')
require('dotenv').config()
var wiki = require('./wiki.js');


const app = express()
app.use('/wiki', wiki);
const port = 3000


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

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

app.get('/getData', (req, res) => {
    // Establishing connection with the MongoDB

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})