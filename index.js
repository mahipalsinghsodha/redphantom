const express  = require('express');
const port = 8000;
const appRoute = require('./routes/index');
const app = express();
const db = require('./config/mongoose');

//middleware
app.use(express.urlencoded());
app.use(express.static('./assets'));

// set up the vies engine
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());

/** routes */
app.use('/', appRoute);


app.listen(port,(error)=>{
    if(error){
        console.log("Error while runing the server at port: " ,port)
        return;
    }
     console.log('Server is Running');
})