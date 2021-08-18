const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

async function sendSms(message, phoneNumber) {
    return new Promise(resolve => {
        client.messages
            .create({
                body: message,
                from: '+18508163940',
                to: `+91${phoneNumber}`
            })
            .then(message => console.log(message.sid));
    });
}

module.exports = {
    sendSms: sendSms
}