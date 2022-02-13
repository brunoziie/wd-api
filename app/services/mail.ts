const { MAILGUN_API_KEY, MAILGUN_FROM, MAILGUN_DOMAIN } = process.env;

const Mailgun = require('mailgun.js');
const formData = require('form-data');
const mg = new Mailgun(formData).client({ username: 'api', key: MAILGUN_API_KEY });

interface Message {
  to: string;
  subject: string;
  body: string;
}

export async function sendMail(message: Message) {
  await mg.messages.create(MAILGUN_DOMAIN, {
    from: MAILGUN_FROM,
    to: message.to,
    subject: message.subject,
    html: message.body,
  });
}
