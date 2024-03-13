const express = require('express');
const handleAdminMiddleware = require('../middleware/admin');
const router = express.Router();
const {Admin,Course} = require('../db')

//Admin Routes
//if a request is coming here it means it is : /admin/signup
//it is not /signup *
router.post('/signup',async(req,res)=>{
    //Implement Admin SignUp Logic
     const username = req.body.username;
     const password = req.body.password;

     //check if user with this username already exists
      const userExists = await Admin.find({ username: username})
      console.log(userExists.length);
      if(userExists.length > 0) {
        return res.status(400).send('Username already exists');
      }
      //create new user
     await Admin.create({
         username: username,
         password: password
      })
      res.status(201).send('Admin Created'); 
})

router.post('/courses',handleAdminMiddleware,async(req,res)=>{
            
     const title = req.body.title;
     const description = req.body.description;
     const price = req.body.price;
     const imageLink = req.body.imageLink;

   const newCourse =  await Course.create({
         title: title,
         description: description,
         price: price,
         imageLink: imageLink
     })
     res.status(201).json({
        message : 'Course created successfully',
        courseId : newCourse._id
     });
})

router.get('/courses',handleAdminMiddleware,async(req,res)=>{
     
     const courses = await Course.find({});
   
     res.status(200).json(courses);
      
})

module.exports = router;