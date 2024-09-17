const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const { Error } = require('mongoose');
const jwt = require("jsonwebtoken");

async function userSignInController (req , res){
    try{
        const {email , password} = req.body;
        if(!email){
            throw new Error ("please provide email")
        }
        if(!password){
            throw new Error ("please provide email")
        }

        const user = await userModel.findOne({email});

        if(!user){
            throw new Error("user not found");
        }

        const checkPassword =await bcrypt.compare(password, user.password);
 

        if(checkPassword){
            const tokenData = {
                _id : user._id,
                email: user.email,
            }
            const token = await jwt.sign(tokenData , process.env.TOKEN_SECRECT_KEY, {expiresIn: 60*60*8})

            const tokenOption = {
                httpOnly : true,
                secure : true
            }
            res.cookie("token", token , tokenOption).json({
                message : "Login successfully ",
                data : token, 
                success: true,
                error : false
            })

        }else{
            throw new Error("Please check the password");
        }
    }
    catch(err){
        res.json({
            msg : err.message || err,
            error : true,
            success: false,
           })
    }
}

module.exports = userSignInController;
