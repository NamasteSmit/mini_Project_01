const {User} = require('../db')
async function handleUserMiddleWare(req,res,next){

     const username = req.headers.username;
     const password = req.headers.password;

      const user = await User.findOne({
        username: username,
        password: password
      })

      if(user){
        next();
      }else{
        res.status(401).json({message: 'Invalid Credentials or User Doesnt exists'})
      }


}

module.exports = handleUserMiddleWare;