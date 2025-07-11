import express from "express";
import { userRegister } from "../Controller/userController.js";

const router = express.Router();

router.route("/register").post(userRegister);

export default router;