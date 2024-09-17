const backendDomain  = "http://localhost:8080"

const summaryApi = {
    signUP: {
        url : `${backendDomain}/api/signup`,
        method: "post",
    },
    signIn : {
        url : `${backendDomain}/api/signin`,
        method : "post"
    },
    current_user : {
        url :  `${backendDomain}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backendDomain}/api/userLogout`,
        method : "get"
    },
     allUser : {
        url : `${backendDomain}/api/all-users`,
        method: "get"
    },
    userUpdate : {
        url: `${backendDomain}/api/user-update`,
        method: "post",
       
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-Product`,
        method: 'post'
    },
    allProduct:{
        url: `${backendDomain}/api/get-product`,
        method: "get"
    },
    updateProduct:{
        url: `${backendDomain}/api/updateProduct`,
        method: "post"
    }
  

}

export default summaryApi