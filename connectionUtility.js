//jshint esversion:6
const mongoose = require("mongoose");
module.exports.signupLogin = signupLogin;

function signupLogin(){
  mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser: true});
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    email: String,
    password: String
  });

  const User = new mongoose.model("User",UserSchema);

  return User;
}
