const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter the name"],
  },
  email:{
    type: String,
    required: [true, "please enter the email"],
    unique: [true, "already exists this email address"],
    validate:[validator.isEmail, "please enter the valid email"],
  },
  password:{
    type: String,
    required: [true, "please enter the password"],
    maxlength: [6,'password cannot exceed 6 character'],
  },
  avatar:{
    type:String,
    required: true
  },
  role:{
    type:String,
    default: 'user'
  },
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,

  createdAt:{
    type:Date,
    default: Date.now
  } 
});

userSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,10);
})

let model = mongoose.model('user',userSchema);
module.exports = model;