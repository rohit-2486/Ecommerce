// const userModel = require("../models/userModel");


// async function updateUser(req , res) {
    
//     try{

//         const sessionUser = req.userId;
//         const {userId , name , email , role} = req.body;

//         const payload = {
//             ...(email && {email : email}),
//             ...(name && {name : name}),
//             ...(role && {role : role}),
//         }

//         const user = await userModel.findById(sessionUser)
//         console.log("user-role", user.role);

//         const updateUser = await userModel.findByIdAndUpdate({userId , payload})

//         res.status(200).json({
//             data: updateUser,
//             message: "user updated",
//             success: true,
//             error: false
//         })

//     }catch(err){
//         res.status(400).json({
//             message : err.message || err,
//             error : true,
//             success : false
//         })
//     }
// }

// module.exports = updateUser;


const userModel = require("../models/userModel");

async function updateUser(req, res) {
    try {
        const sessionUser = req.userId;
        const { userId, name, email, role } = req.body;

        // Create the update payload
        const payload = {
            ...(email && { email: email }),
            ...(name && { name: name }),
            ...(role && { role: role }),
        };

        // Fetch the user for role checking (optional step)
        const user = await userModel.findById(sessionUser);
        console.log("user-role", user.role);

        // Update the user with the provided userId
        const updateUser = await userModel.findByIdAndUpdate(userId, payload, { new: true });

        res.status(200).json({
            data: updateUser,
            message: "User updated",
            success: true,
            error: false,
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = updateUser;
