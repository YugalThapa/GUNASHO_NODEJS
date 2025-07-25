import express from "express";
import { isLoggedIn } from "../Middleware/authMiddleware.js";
import { ComplainGet, complainUpdate, complainDelete, complainHistory} from "../Controller/complainController.js";
import upload from "../Middleware/imageMiddleware.js";

const router = express.Router();

//route to create complain
router.route("/create").post(isLoggedIn,upload.single("imageName"),ComplainGet); // http://localhost:3000/api/complain/create
router.route("/update/:complainId").patch(isLoggedIn, complainUpdate); // http://localhost:3000/api/complain/update/:complainId
router.route("/delete/:complainId").delete(isLoggedIn, complainDelete); // http://localhost:3000/api/complain/delete/:complainId
router.route("/history").get(isLoggedIn, complainHistory); // http://localhost:3000/api/complain/history?category=road&currentStatus=pending


export default router;