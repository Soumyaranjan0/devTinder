const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./Models/User");
app.use(express.json());
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.post("/signup", async (req, res) => {
  try {
    //Validating of data from utils file
    validateSignupData(req);

    const { firstName, lastName, emailId, password, age, gender ,skills } = req.body;

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
      skills
    });
    await user.save();
    res.send("User signup successfully!");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

//get user by email
app.get("/user", async (req, res) => {
  const userMail = req.body.emailId;
  console.log(userMail);
  try {
    const fetchUser = await User.find({ emailId: userMail });
    if (fetchUser === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(fetchUser);
    }
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});

//Feed API - GET/feed -get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});

//Delete a user by ID
app.delete("/user", async (req, res) => {
  const userId = req.body._id;
  console.log(userId);
  try {
    const users = await User.findByIdAndDelete({ _id: userId });
    res.send(users);
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});

//Update data of the user
app.patch("/user", async (req, res) => {
  const userId = req.body._id;
  const data = req.body;
  try {
    //validations for fileds
    const allow_updates = [
      "_id",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      allow_updates.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    //validation for skills
    if (data?.skills.length > 10) {
      throw new Error("user canot add more than 10 skills");
    }

    //find the data by id and update it
    const users = await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send(users);
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});

//Database connection and Port Listening(imp:first database connection then after start the server)
connectDB()
  .then(() => {
    console.log("MongoDB connected successfully...");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000...");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed");
  });
