import express from 'express';
import { sendMail } from '../../services/mail';
import { defaultTemplate } from '../../services/template';

export default function index(req: express.Request, res: express.Response) {
  // sendMail({
  //   to: 'eu@brunoziie.com',
  //   from: 'email: '
  // });

  res.send('');
}
