const express = require('express');
const app = express();
const port = 8000;
const bodyParser  = require('body-parser');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');


//Middleware for parsing request bodies
app.use(bodyParser.json());

//this means that anytime a request is made on /admin/anything it will go to the adminRouter
//so all the admin requests will go to the adminRouter
app.use("/admin", adminRouter);

//all the user requests will go to the userRouter 
app.use("/user", userRouter);

 

app.listen(port,(req, res) => {
    console.log(`Server is running on port ${port}`);
})