import * as dotenv from 'dotenv';
dotenv.config();

export const getMailConfig = () => ({
  host: process.env.SMTP_HOST,
  port: +process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
