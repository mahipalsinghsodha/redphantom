//  mongoose

const mongoose = require('mongoose');

// connection
mongoose.connect("mongodb+srv://redphantom:redphantam12@cluster0.bnpvhqb.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{console.log("Successfully connected to database")})
.catch((error)=>{console.log("Error while connection with db: ", error)});