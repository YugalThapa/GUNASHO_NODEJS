import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Middleware to authenticate user
export const isLoggedIn = (req, res, next) => {
    const auth = req?.headers?.authorization;
    console.log(auth);
    const token = auth && auth.startsWith("Bearer ") ? auth.split(" ")[1] : auth;
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, result) => {
        if (error) {
            console.log(error.message);
            res.status(401).json({
                message: "Unauthorized user",
            });           
        }
        else {
            req.user = {
                id : result.userId
            }
            next();
        }
    })
};