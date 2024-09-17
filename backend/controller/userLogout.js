

async function userLogout(req ,res){

    try{
        res.clearCookie("token")
        
        res.status(200).json({
        message : "Logout successfully",
        data : [],
        success : true,
        error : false
        })
        

    }catch(err){
        res.status(400).json({
            message : err.message || err ,
            error : true,
            success : false,
        })
    }
}

module.exports = userLogout