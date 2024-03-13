const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://smitpatel1305:Smit2004@cluster0.udla4ro.mongodb.net/course_app');

const AdminSchema = new mongoose.Schema({
    //Schema Definition Here
    username : String,
    password : String,
});


const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    }]
});


const CourseSchema = new mongoose.Schema({
     title : String,
     description : String,
     imageLink : String,
     price : Number,
});

const Admin = mongoose.model('Admin',AdminSchema)
const User = mongoose.model('User',UserSchema)
const Course = mongoose.model('Course',CourseSchema);

module.exports = {Admin, User, Course};