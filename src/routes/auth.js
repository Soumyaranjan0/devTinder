const express = require("express");
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation");
const User = require("../Models/User");
const bcrypt = require("bcrypt");


//SignUp for a new user
authRouter.post("/signup", async (req, res) => {
    try {
      //Validating of data from utils file
      validateSignupData(req);
  
      const { firstName, lastName, emailId, password, age, gender, skills } =
        req.body;
  
      //Encrypt the password
      const passwordHash = await bcrypt.hash(password, 10);
  
      //Creating a new instance of the User model
      const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
        age,
        gender,
        skills,
      });
      await user.save();
      res.send("User signup successfully!");
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  });

//Login a user
authRouter.post("/login", async (req, res) => {
    try {
      const { emailId, password } = req.body;
      const user = await User.findOne({ emailId });
      if (!user) {
        throw new Error("User is not present in the Database"); //Dont give extra information use like"Invalid Credential"
      }
      //validate the password
      const isPasswordValid = await user.validatePassword(password);
      if (isPasswordValid) {
        //creat a JWT token in schema
        const token = await user.getJWT();
        // console.log(token);
        //Add the token to cookie and send the response back to the user
        res.cookie("token", token);
        res.send("User Login successsfully!");
      } else {
        throw new Error("User password is Wrong");
      }
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  });

//Logout a user
authRouter.post("/logout", async (req, res) => {
      res.cookie("token",null,{
        expires: new Date(Date.now()) // set cookie to expire when the browser is closed or when the domain is deleted (set path to '/')
      })
      res.send("User Logout Successfully")
  });

module.exports = authRouter;
