//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser: true});

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  password: String
});

const User = new mongoose.model("User",UserSchema);

app.get("/", (req,res)=>{
  res.render("home");
});

app.get("/login", (req,res)=>{
  res.render("login");
});

app.post("/login", (req,res)=>{
  User.find({email:req.body.username}, function(err, foundUser){
    if(err){
      console.log("Some error occured while logging in");
    }else{
      if(foundUser){
        console.log(foundUser[0].password + "--" + req.body.password);
        if(foundUser[0].password === req.body.password){
          res.render("secrets");
        }else{
          console.log("Wrong password");
        }
      }else{
        console.log("User not found");
      }
    }
  });
});

app.get("/register", (req,res)=>{
  res.render("register");
});

app.post("/register", (req,res)=>{
  const newUser = new User({
    email: req.body.username,
    password: req.body.password
  });

  newUser.save(function(err){
    if(err){
      console.log("Error occured while registering");
    }else{
      res.render("secrets");
    }
  });
});





app.listen(3000,()=>{
  console.log("Started at 3000");
});
