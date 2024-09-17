const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : String,
    email : {
       type : String,
       require : true,
       unique : true,
    },
    password : String,
    profilePic : String,
    role : String,
},{
    timestamps : true
})

const userModel = mongoose.model("user" , userSchema);

module.exports = userModel;