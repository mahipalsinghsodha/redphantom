const express  = require('express');
const dotenv = require('dotenv');
const appRoute = require('./routes/index');
const app = express();
const connectDB = require('./config/mongoose');

//middleware
app.use(express.urlencoded());
app.use(express.static('./assets'));

// set up the vies engine
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT;

connectDB();

/** routes */
app.use('/', appRoute);


app.listen(PORT,(error)=>{
    if(error){
        console.log(`Error while runing the server at port:${port}`)
        return;
    }
     console.log('Server is Running');
})