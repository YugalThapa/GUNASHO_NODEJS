import User from "../Model/userModel.js";
import Complain from "../Model/complainModel.js";

const ComplainGet = async (req, res) => {
    const { complainFor } = req.body;
    const userId = req.user.id;
    if ( !complainFor || !userId){
        res.status(400).json({
            message : "Complain and user Id are required!!"
        });
        return;
    }

    const complainCreate = await Complain.create({
        complainFor : complainFor,
        complainBy : userId
    });
    if ( !complainCreate){
        res.status(400).json({
            message : "Complain creation failed!!"
        });
        return;
    }
    res.status(200).json({
        message : "Complain created successfully."
    });
};

export { ComplainGet };