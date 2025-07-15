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
        citizenId: citizenId
    });

    if (!newUser) {
        res.status(403).json({
            message: "User registration failed",
        });
        return;
    }

    //for sending mail after registration
    const mailData = {
        from : process.env.EMAIL, // Use the email from .env file
        to : email,
        subject : "Registration Successful",
        html : registerMail({
            fullName: fullName,
            email: email,
            address: address,
            citizenId: citizenId
        })
    }

    sendMail(mailData);

    res.status(200).json({
        message : "Registration successful, please check your email for confirmation."
    })
};

//User login
const userLogin = async (req, res) => {
    const { email, password} = req.body;
    if (!email || !password){
        res.status(400).json({
            message : "Email and password are required!!"
        });
        return;
    }

    const findUser = await User.findOne({           //find user by email
        email : email
    });

    if (!findUser){ 
        res.status(404).json({
            message : "User not found, please register first!!"
        });
        return;
    }

    //compare the password with the hashed password in the database
    const isPasswordValid = bcrypt.compareSync(password, findUser.password);
    if ( !isPasswordValid){
        res.status(401).json({
            message : "Invalid password!!"
        });
        return;
    }

    //create a token for the user
    const token = jwt.sign({
        userId : findUser._id,
        name : findUser.fullName,
    }, process.env.JWT_SECRET_KEY, {
        expiresIn : "10d"
    })

    res.status(200).json({
        message : "Login successful.",
        token : token
    })
};

export { userRegister, userLogin};