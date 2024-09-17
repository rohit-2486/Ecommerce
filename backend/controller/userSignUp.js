const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');

async function userSignUpController(req , res){
    try{
        const {email , name , password} = req.body; 

        const user = await userModel.findOne({email})
        
        if(user){
            throw new Error ("user already exists")
        }

        if(!email){
            throw new Error ("please provide email")
        }
        if(!name){
            throw new Error ("please provide name")
        }
        if(!password){
            throw new Error ("please provide password")
        }
        
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if(!hashPassword){
            throw new Error ("Something is wrong");
        }

        const payload = {
            ...req.body,
            role: "GENERAL",
            password : hashPassword
        }

        const userData = new userModel(payload);
        const saveUser = await userData.save();
        
        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "user created sucessfully"
        })

    }catch(err){ 
       res.status(400).json({
        msg : err.message || err,
        error : true,
        success: false,
       })

    }
}

module.exports = userSignUpController;