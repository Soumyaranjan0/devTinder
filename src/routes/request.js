const express = require("express");
const requestRouter = express.Router();
const { UserAuth } = require("../middleware/auth");


requestRouter.post("/sendConnectionREsuest", UserAuth, (req, res, next) => {
  const user = req.user;
  console.log("Sending a connection request");
  res.send(user.firstname + " sent the connectio request ");
});

module.exports = requestRouter;
