import express from "express";
import cors from "cors";
import mongoose  from "mongoose";
import dotenv from "dotenv";

const app = express();      //create an express app 
dotenv.config();            //load env variables
app.use(express.json());     //parswe incoming JSON requests
app.use(cors({origin : "*"}));  //allow cross-origin requests(frontend can access backend)

//connect to MongoDB
mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Connected to MongoDB")
}).catch((err) => {
    console.log(err.message)
    console.log("Failed to connect to MongoDB")
});

//start the express server
const PORT = process.env.PORT || 3000;
app. listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
});