// import express
const express = require("express");
const User = require("../models/user");
// get the Functionality of Router method

const router = express.Router();

// import the uaer controller
const userController = require("../controllers/user");

router.get("/", async (req, res)=> {
  // User.find({}, function(err, user){
  //     if(err){
  //         console.log('Error in the fatching in the db');
  //         return;
  //     }
  //     res.render('home',{
  //         title:"My ContactList",
  //         data_send : user
  //     });
  // });
  try {
    const users = await User.find({});
    res.render("home", {
      title: "My ContactList",
      data_send: users,
    });
  } catch (error) {
    console.log('Error in the fatching in the db');
    return;
  }
    
});
router.post("/create", userController.signUp);

router.post("/getbill", userController.getbill);

module.exports = router;
