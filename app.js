const express = require("express");
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const users = require('./routes/api/users');
const events = require('./routes/api/events');
const departments = require('./routes/api/departments')
const User = require('./models/User');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
const passport = require('passport')
const path = require("path");


mongoose
    .connect(db ,{ useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log('Connected to mongoDB'))
    .catch( err => console.log(err));
    
    
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("Inside Express"));
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize());
require('./config/passport')(passport);


app.use('/api/users/', users);
app.use('/api/events/', events);
app.use('/api/departments/', departments);


const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`Server is running on port ${port}`));






    // const newUser = new User({
    //     email: 'justin@justin.com',
    //     firstName: 'Justin',
    //     lastName: 'Meyer',
    //     admin: true,
    //     password: 'iamjustin'
    // })
    // SEED
    // email : 'testemail@email.com'
    // password : password
    // admin : true