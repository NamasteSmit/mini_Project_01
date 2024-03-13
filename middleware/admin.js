const {Admin} = require('../db');


//Middleware For handling Auth

async function handleAdminMiddleware(req, res, next){
    //Implement admin auth logic

    const username = req.headers.username;
    const password = req.headers.password;

   const admin = await Admin.findOne({username: username, password: password})

    if(admin)
    {
        next();
    }else{
        res.status(401).json({message: "Invalid Credentials or You are not Admin"})
    }

}

module.exports = handleAdminMiddleware;