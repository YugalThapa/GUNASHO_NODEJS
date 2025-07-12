import express from "express";
import { userRegister } from "../Controller/userController.js";

const router = express.Router();

router.route("/register").post(userRegister);   // http://localhost:3000/api/user/register

export default router;