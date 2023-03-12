const mongoose = require('mongoose');

// defined the schema
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type:String,
        required: true,

    },
    question:{
        type:String,
        required: true,
    
    },
    message:{
        type:String,
        required:true
    }
});

module.exports = User = mongoose.model('user', UserSchema)