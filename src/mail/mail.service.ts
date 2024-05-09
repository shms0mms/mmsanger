import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { getMailConfig } from 'src/config/mail.config';
@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport(getMailConfig());
  }
  async sendEmail(to: string, subject: string, text: string) {
    try {
      const info = await this.transporter.sendMail({
        from: getMailConfig().auth.user,
        to,
        subject,
        text,
      });
      console.log('Email sent:', info.response);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
}
