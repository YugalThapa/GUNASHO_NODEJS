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
    categtory : {
        type : String,
        required : true
   },
   description : {
    type : String,
    required : true
   }
   },{
    timestamps : true
});

const Complain = mongoose.model("Complain", complainSchema);
export default Complain;