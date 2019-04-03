//jshint esversion:6
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser: true});
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  password: String
});

module.exports.userData =  mongoose.model("User",UserSchema);
