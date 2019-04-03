//jshint esversion:6
const passport = require(__dirname + "/app.js");
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser: true});
mongoose.set("useCreateIndex",true);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  password: String
});

UserSchema.plugin(passport.plm);

const user = mongoose.model("User",UserSchema);
passport.pp.use(user.createStrategy());

passport.pp.serializeUser(user.serializeUser());
passport.pp.deserializeUser(user.deserializeUser());

module.exports.userData =  user;
