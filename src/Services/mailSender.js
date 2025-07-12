import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();   
const sendMail = async (mailData) => {
    const tranxporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : "ytmagar08@gmail.com",
            pass : process.env.APP_PASSWORD // Use the app password for Gmail
        }
    });
    try {
        const send = await tranxporter.sendMail(mailData)
    }
    catch (error) {
        console.log(error.message)
    }
} 

export default sendMail;