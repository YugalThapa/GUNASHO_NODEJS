import express from "express";
import { userRegister, userLogin } from "../Controller/userController.js";

const router = express.Router();

router.route("/register").post(userRegister);   // http://localhost:3000/api/user/register
router.route("/login").post(userLogin)

export default router;