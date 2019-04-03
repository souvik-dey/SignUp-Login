//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const connection = require(__dirname + "/connectionUtility.js");
const bCrypt = require(__dirname + "/bcrypt.js");

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
          bCrypt.bcryptCompare(req.body.password, foundUser.password, (result) => {
            if(result){
              res.render("secrets");
            }else{
              console.log("Wrong password");
            }
          });
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
  bCrypt.bcryptPassword(req.body.password,(hash)=>{    //here "hash" is the returned value
  const newUser = new connection.userData({
    email: req.body.username,
    password: hash
  });

  newUser.save(function(err){
    if(err){
      console.log("Error occured while registering");
    }else{
      res.render("secrets");
    }
  });
  });
});





app.listen(3000,()=>{
  console.log("Started at 3000");
});
