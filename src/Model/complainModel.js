import mongoose, { Schema } from "mongoose";

const complainSchema = new Schema({
    complainFor : {
        type : String,
        required : true,
        null : false
    },
    complainBy : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        required : true
    },
    category : {
        type : String,
        enum: ["road", "water", "electricity", "sanitation", "other"],
        required : true
   },
   location : {
    type : String,
    required : true
   },
   contactInfo : {
        type : String,
        required : true
   },
   currentStatus : {
        type : String,
        enum: ["pending", "in-progress", "resolved", "rejected"],
        default: "pending" 
   },
   description : {
    type : String,
    required : true
   },
   image : {
    type : String
   }
   },{
    timestamps : true
});

const Complain = mongoose.model("Complain", complainSchema);
export default Complain;