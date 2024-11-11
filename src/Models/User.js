const mongoose = require("mongoose");
var validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength:2,
    maxLength:20,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase:true,
    trim:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid Email address"+value)
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Invalid Email address"+value)
      }
    },
  },
  age: {
    type: Number,
    min:15,
  },
  gender: {
    type: String,
    validate(value){
      if(!["male","female","others"].includes(value)){
        throw new Error("Gender data is not valid")
      }
    }
  },
  photoUrl:{
    type:String,
    default:"https://images.app.goo.gl/K7dH96Cs3fV3vYkT6",
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("Invalid Photo Url"+value)
      }
    },
  },
  about:{
    type:String,
    default:"This is a default about of the user"
  },
  skills:{
    type:[String],
  },
},
{
  timestamps:true,
}
);

module.exports = mongoose.model("User", userSchema);
