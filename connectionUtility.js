//jshint esversion:6
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser: true});
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  password: String
});
const secret = "littlesecretkey";
UserSchema.plugin(encrypt, { secret: secret,
                             encryptedFields: ["password"]
                           }
);

module.exports.userData =  mongoose.model("User",UserSchema);
