//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

module.exports.pp = passport;
module.exports.plm = passportLocalMongoose;

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({           //Implement it  before mongo connection
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const connection = require(__dirname + "/connectionUtility.js");

app.get("/", (req,res)=>{
  res.render("home");
});

app.get("/login", (req,res)=>{
  res.render("login");
});

app.post("/login", (req,res)=>{
  const newUser = new connection.userData({
    username: req.body.username,
    password: req.body.password
  });

  req.login(newUser, function(err){    //This method comes from passport
    if(err){
      console.log(err);
    }else{
      passport.authenticate("local")(req,res,function(){
        res.redirect("/secrets");
      });
    }
  });
});

app.get("/register", (req,res)=>{
  res.render("register");
});

app.get("/secrets", (req,res)=>{
  if(req.isAuthenticated()){
    res.render("secrets");
  }else{
    res.redirect("/login");
  }
});

app.post("/register", (req,res)=>{
  connection.userData.register({    //This method comes from passport
    username: req.body.username
  }, req.body.password, function(err,user){
    if(err){
      console.log(err);
      res.redirect("/register");
    }else{
      passport.authenticate("local")(req,res,function(){
        res.redirect("/secrets");
      });
    }
  });
});

app.get("/logout", (req,res)=>{
  req.logout();
  res.redirect("/");
});



app.listen(3000,()=>{
  console.log("Started at 3000");
});
