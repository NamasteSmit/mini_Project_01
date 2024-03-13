const express = require('express');
const handleUserMiddleware = require('../middleware/user');
const router = express.Router();
const{User,Course} = require('../db');
const mongoose = require('mongoose');
//User Routes

router.post('/signup',async(req,res)=>{ 
  const username = req.headers.username;
  const password = req.headers.password;

  const newUser =await User.create({
    username:username,
    password:password
  })
  res.json({
    message : "User Created SuccessFully"
})
})

router.get('/courses',async(req,res)=>{
    //No need to check whethter user is signedIn or not because courses are visible to anyone 
    const courses = await User.find({});

    res.json({
            courses: courses,
        })
})

router.post('/courses/:courseId',handleUserMiddleware,async (req,res)=>{
      const courseId = req.params.courseId;

      const username = req.headers.username;

     await User.updateOne({username: username},{
            "$push":{
                purchasedCourses :courseId
            }
        }
      )

      res.json({
        message : "Course Purchased"
      })

})

router.get('/purchasedCourse',handleUserMiddleware,async(req,res)=>{
     const username = req.headers.username;

     const user = await User.findOne({
         username:username
     })

     const course = await Course.find({
          _id : {
            "$in" : user.purchasedCourses
          }
     })
     res.json({
        courses: course
     })
})

module.exports = router
