// import express
const express = require('express');
const User = require('../models/user');
// get the Functionality of Router method 

const router = express.Router();

// import the uaer controller
const userController = require('../controllers/user');

router.get('/', function(req,res){
        res.render('home',{
            title:"My ContactList"
        });
    // res.render('home',{
    //     title:"My ContactList",
    //     contact_list : contactList
    // });
});
router.post('/create', userController.signUp);

router.post('/getbill', userController.getbill);




module.exports =router;