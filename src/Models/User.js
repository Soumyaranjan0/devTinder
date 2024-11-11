const mongoose = require("mongoose");

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
  },
  password: {
    type: String,
    required: true,
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
