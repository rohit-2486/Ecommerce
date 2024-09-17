const express = require("express")
const router = express.Router();

const userSignUpController = require("../controller/userSignUp");
const userSignInController = require("../controller/userSignIn");
const userDetailsController = require("../controller/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/userLogout");
const allUsers = require("../controller/allUser");
const updateUser = require("../controller/updateUser"); 
const uploadProductController = require("../controller/uploadProduct");
const getProductController = require("../controller/getProduct");
const updateProductController = require("../controller/updateProduct")

router.post("/signup", userSignUpController);
router.post("/signin",userSignInController);
router.get("/user-details",authToken,userDetailsController);
router.get("/userLogout",userLogout); 


//admin panel
router.get("/all-users",authToken,allUsers);
router.post("/user-update",authToken,updateUser)

//upload-product
router.post("/upload-Product",authToken,uploadProductController);
router.get("/get-product",getProductController)

// update-product
router.post("/updateProduct",authToken,updateProductController)

module.exports = router;