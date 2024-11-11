const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./Models/User");
app.use(express.json());

app.post("/signup", async (req, res) => {
  //Creating a new instance of the User model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user signup successfully");
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
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
  console.log(userId)
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
  const data=req.body
  try {
    const users = await User.findByIdAndUpdate({ _id: userId },data,{runValidators:true});
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
