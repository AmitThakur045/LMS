import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config({path: "server/config/config.env"});

const OAuth2 = google.auth.OAuth2;

const OAuth2Client = new OAuth2(
  process.env.GOOGLE_GMAIL_CLIENT_ID,
  process.env.GOOGLE_GMAIL_CLIENT_SECRET,
  process.env.GOOGLE_GMAIL_REDIRECT_URL
);

OAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_GMAIL_REFRESH_TOKEN,
});

const accessToken = new Promise((resolve, reject) => {
  OAuth2Client.getAccessToken((err, token) => {
    if (err) {
      reject(err);
    } else {
      resolve(token);
    }
  });
});

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_GMAIL_USER,
    clientId: process.env.GOOGLE_GMAIL_CLIENT_ID,
    clientSecret: process.env.GOOGLE_GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_GMAIL_REFRESH_TOKEN,
    accessToken: accessToken,
  },
});

