import User from "../Model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sendMail from "../Services/mailSender.js";
import { registerMail } from "../Static/registerMail.js";
dotenv.config();

//New User registration
const userRegister = async (req, res) => {
    const { email, password, fullName, address, citizenId } = req.body;
    if (!email || !password || !fullName || !address || !citizenId) {
        res.status(400).json({
            message: "All fields are required!!",
        });
        return;
    }

  // Create a new user
    const newUser = await User.create({
        fullName: fullName,
        email: email,
        password: bcrypt.hashSync(password, 10), //hash the password
        address: address,
        citizenId: citizenId,
    });

    if (!newUser) {
        res.status(403).json({
            message: "User registration failed",
        });
        return;
    }

    //for sending mail after registration
    const mailData = {
        from : "ytmagar08@gmail.com",
        to : email,
        subject : "Registration Successful",
        html : registerMail()
    }

    sendMail(mailData);

    res.status(200).json({
        message : "Registration successful, please check your email for confirmation."
    })
};

export { userRegister };