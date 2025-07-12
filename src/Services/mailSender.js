import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();   
const sendMail = async (mailData) => {
    const transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : "ytmagar08@gmail.com",
            pass : process.env.APP_PASSWORD // Use the app password for Gmail
        }
    });
    try {
        const send = await transporter.sendMail(mailData)
    }
    catch (error) {
        console.log(error.message)
    }
} 

export default sendMail;