const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

const app = express();
app.use(express.static("public"));
dotenv.config();

const db = process.env.DB;

mongoose.connect(
  db,
  {
    useNewUrlParser: true,
  }
);

const usersSchema = {
  name: String,
  lastName: String,
  email: String,
  password: String
};

const User = mongoose.model("User", usersSchema);

app.get("/", function (req, res) {
  console.log("Root");
});

app.post("/signup", function(req, res){

  const name = req.query.name;
  const lastName = req.query.lastName;
  const email = req.query.email;
  const password = req.query.password;

  User.findOne({email: email}, function(err, foundUser){
    if (!err){
      if (!foundUser){
        //Create a user
        const user = new User({
          name: name,
          lastName: lastName,
          email: email,
          password: password
        });
        user.save();
        res.end('Successfully savevd items to DB');
      } else {
        res.end('User already registered, kindly log in');
      }
    }
  });
});

app.post("/login", function(req, res){

  const email = req.query.email;
  const password = req.query.password;

  User.findOne({email: email}, function(err, foundUser){
    if (!err){
      if (!foundUser){
        res.end("User not registered, kindly sign up");
      } else {
        if (foundUser.password === password){
          res.end("Log in successfully");
        }else{
          res.end("Incorrect password");
        }
      }
    }
  });
});

let port = process.env.PORT || 8000;

app.listen(port, function () {
  console.log("Server started successfully");
});
