import express from "express";
import { isLoggedIn } from "../Middleware/authMiddleware.js";
import { ComplainGet } from "../Controller/complainController.js";

const router = express.Router();

//route to create complain
router.route("/create").post(isLoggedIn,ComplainGet); // http://localhost:3000/api/complain/create

export default router;