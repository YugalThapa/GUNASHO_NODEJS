import User from "../Model/userModel.js";
import Complain from "../Model/complainModel.js";
import sendMail from "../Services/mailSender.js";
import { complainMail } from "../Static/complainMail.js";

const ComplainGet = async (req, res) => {
    const { complainFor, category, description, location , contactInfo } = req.body;
    const userId = req.user.id;
    
    if ( !complainFor || !userId || !category || !description || !location || !contactInfo) {
        res.status(400).json({
            message : "All fields are required (except currentStatus)!!"
        });
        return;
    }

    try {
        const complainCreate = await Complain.create({
            complainFor : complainFor,
            category : category,
            description : description,
            complainBy : userId,
            location : location,
            contactInfo : contactInfo
        });

        //for sending mail after complain registration
        const userForMail = await User.findById(userId);
        if (!userForMail) {
            return res.status(404).json({ message: "User not found!" });
        }

        const mailData = {
            from : "ytmagar08@gmail.com",
            to : userForMail.email,
            subject : "Complain Registration Successful",
            html : complainMail()
        }

        sendMail(mailData);

        res.status(201).json ({
            message : "Complain created successfully. You can verify complain through mail.",
            data : complainCreate
        });
   }
    catch (err) {
        res.status(400).json({
            message : "Complain creation failed!!",
            error : err.message    
        });
    }
};

//update the complain
const complainUpdate = async (req, res) => {
    const { complainFor, category, description, location , contactInfo, currentStatus } = req.body;
    const {complainId} = req.params;
    const userId = req.user.id;

    if (!complainId){
        res.status(400).json({
            message : "Complain Id is required!!"
        });
        return;
    }

    //finding the complain to update
    const findComplain = await Complain.findById(complainId);
    if (!findComplain){
        res.status(404).json({
            message : "Complain with this id not found!!"
        });
        return;
    }

    //authorizing only the user who create complain
    if (!findComplain.complainBy.equals(userId)) {
        res.status(403).json({
            message: "You are not authorized to update this complain!"
        });
        return;
    }

    if ( complainFor === undefined &&
        category === undefined &&                           //check for at least one field to update
        description === undefined &&
        location === undefined &&
        contactInfo === undefined &&
        currentStatus === undefined ){
            res.status(400).json({
            message : "At least one field must be updated!!"
        });
        return;
    }

    const updateFields = {};
    if (complainFor) updateFields.complainFor = complainFor;
    if (category) updateFields.category = category;
    if (description) updateFields.description = description;
    if (location) updateFields.location = location;
    if (contactInfo) updateFields.contactInfo = contactInfo;
    if (currentStatus) updateFields.currentStatus = currentStatus;

    
    const updateComplain = await Complain.findByIdAndUpdate(complainId, updateFields, {new : true});
    res.status(200).json({
        message : "Complain updated sucessfully.",
        data : updateComplain
    });
};

//delete the complain
const complainDelete = async (req, res) => {
    const {complainId} = req.params;
    const userId = req.user.id;

    if (!complainId ){
        res.status(400).json({
            message : "Complain Id is required!!"
        });
        return;
    };

    //finding the complain to delete
    const findComplain = await Complain.findById(complainId);
    if (!findComplain){
        res.status(404).json({
            message : "Complain with this id not found!!"
        });
        return;
    }

    //authorizing only the user who create complain
    if (!findComplain.complainBy.equals(userId)) {
        res.status(403).json({
            message: "You are not authorized to update this complain!"
        });
        return;
    }

    const deleteComplain = await Complain.findByIdAndDelete({
        _id : complainId
    });
    if (!deleteComplain){
        res.status(404).json({
            message : "Failed to delete!"
        });
        return;
    };
    res.status(200).json({
        message : "Complain deleted successfully.",
        data : deleteComplain
    });

}


export { ComplainGet, complainUpdate , complainDelete};


