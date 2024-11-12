const express = require("express");
const profileRouter = express.Router();
const { UserAuth } = require("../middleware/auth");


//GET profile of a user
profileRouter.get("/profile/view", UserAuth, async (req, res) => {
    try {
      const user = req.user
      res.send(user);
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  });

//Edit profile of a user  
profileRouter.patch("/profile/edit", UserAuth, async (req, res) => {
    try {
      
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  });
module.exports = profileRouter;
