import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        null : false,
        unique : true,
    },
    password : {
        type : String,
        required : true,
        null : false,
    },
    fullName : {
        type : String,
        required : true,
        null : false,
    },
    address : {
        type : String,
        required : true,
        null : false,
    },
    citizenId : {
        type : String,
        required : true,
        null : false,
        unique : true,
    }
});

const User = mongoose.model("User", userSchema);
export default User;