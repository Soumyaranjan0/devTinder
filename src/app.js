const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./Models/User");
app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);
  //Creating a new instance of the User model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user signup successfully");
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
