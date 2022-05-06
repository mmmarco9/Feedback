import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6a9e71adf83ca4",
    pass: "32d471d09e6224"
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Marco Aurélio <marcoo_cs@hotmail.com>",
      subject,
      html: body,
    });
  }
}


/* import nodemailer from 'nodemailer'

import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "6a9e71adf83ca4",
        pass: "32d471d09e6224"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ body, subject }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe feedget <oi@feedget.com>',
            to: 'Marco Aurélio <marcoo_cs@hotmail.com>',
            subject,
            html: body
        })
    }
} */