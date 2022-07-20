import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config({path: "server/config/config.env"});

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendMail = async (msg) => {
    try {
        await sgMail.send(msg);
        console.log("Email sent successfully");
    } catch (err) {
        console.log(err);

        if(err.resposne) {
            console.log(err.response.body);
        }
    }
}