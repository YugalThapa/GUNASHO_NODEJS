import User from "../Model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
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
};

export { userRegister};