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
    let imageName = ""
    if(req.file){
        imageName =req.file.filename; //if image is uploaded, get the file name
    }

    try {
        const complainCreate = await Complain.create({
            complainFor : complainFor,
            category : category,
            description : description,
            complainBy : userId,
            location : location,
            contactInfo : contactInfo,
            image : imageName
        });

        //for sending mail after complain registration
        const userForMail = await User.findById(userId);
        if (!userForMail) {
            return res.status(404).json({ message: "User not found!" });
        }

        const mailData = {
            from : userForMail.email,
            to : "ytmagar08@gmail.com",
            subject : "Complain Registration Successful",
            html : complainMail(complainCreate, userForMail)
        };

        sendMail(mailData);

        res.status(201).json ({
            message : "Complain created successfully. Mail sent to department.",
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
            message: "You are not authorized to delete this complain!"
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

//show complain history
//filter by category and currentStatus
const complainHistory = async(req, res) => {
    try {
        const userId = req.user.id;
        const { category, currentStatus} = req.query;
    
        const filterHistory = {
            complainBy : userId
        }

        if (category){
            filterHistory.category = category
        }
        if (currentStatus){
            filterHistory.currentStatus = currentStatus
        }

        const myComplains = await Complain.find(filterHistory).sort({ createdAt: -1});
        if (!myComplains || myComplains.length === 0) {
            return res.status(404).json({
                message: "No complaints found."
            });
        }
        res.status(200).json({
            message :  "Complaint history fetched successfully.",
            data : myComplains
        });
    
    
    } catch (error){
        res.status(500).json({
            message : "Failed to fetch complaint history!!",
            error : error.message
        });
    }
};

export { ComplainGet, complainUpdate , complainDelete, complainHistory };


