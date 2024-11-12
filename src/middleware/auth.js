const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const UserAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token is not valid!!!");
    }

    const decodeObj = jwt.verify(token, "MyscreteKeyForJWT");
    console.log(decodeObj);

    const { _id } = decodeObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User does not exist");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

module.exports = { UserAuth };
