//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const md5 = require('md5');
const connection = require(__dirname + "/connectionUtility.js");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res)=>{
  res.render("home");
});

app.get("/login", (req,res)=>{
  res.render("login");
});

app.post("/login", (req,res)=>{
  connection.userData.findOne({email:req.body.username}, function(err, foundUser){
    if(err){
      console.log("Some error occured while logging in");
    }else{
      if(foundUser){
        if(foundUser.password === md5(req.body.password)){
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
  const newUser = new connection.userData({
    email: req.body.username,
    password: md5(req.body.password)
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
