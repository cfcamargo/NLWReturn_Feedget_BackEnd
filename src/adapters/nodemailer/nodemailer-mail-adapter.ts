import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from './../mail-adapter';


const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "777f19a0470a70",
    pass: "ee04a67d801e01"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {

    await transport.sendMail({
    from: "Equipe Feedget <oi@fidget.com>",
    to: 'Cristian Camargo <chris.camargo2015@gmail.com>',
    subject: subject,
    html: body
  })

  };
}