//jshint esversion:6

const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALTROUNDS);

module.exports.bcryptPassword = bcryptPassword;
function bcryptPassword(password, callback){
  bcrypt.hash(password, saltRounds, function(err, hash) {
  // Store hash in your password DB.
    if (err) {
      console.log(err);
    } else {
      callback(hash);   // this will "return" your value to the original caller
    }
  });
}

module.exports.bcryptCompare = bcryptCompare;
function bcryptCompare(password, hashPassword, callback){
  bcrypt.compare(password, hashPassword, function(err, result) {
    if(result === true){
      callback(true); // this will "return" your value to the original caller
    }else{
      callback(false);
    }
  });
}
