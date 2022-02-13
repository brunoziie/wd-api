import express from 'express';
import { sendMail } from '../../services/mail';
import { defaultTemplate } from '../../services/template';

export default async function index(req: express.Request, res: express.Response) {
  await sendMail({
    to: 'eu@brunoziie.com',
    subject: 'weedocs - test',
    body: defaultTemplate([
      defaultTemplate.components.paragraph(
        `In this in depth tutorial you'll learn the tools, protocols, and frameworks for building full stack web3 apps, and most importantly - how to put everything together to lay the groundwork for building out any of your own ideas in the future.`
      ),
      defaultTemplate.components.btn('#', 'login', 'success'),
      defaultTemplate.components.btn('#', 'login', 'success'),
    ]),
  });

  res.send('sent');
}
