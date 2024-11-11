const mongoose = require("mongoose");
const URL =
  "mongodb+srv://namasteNodeJs:0UvFLy6HEJYc3yYY@namastenodejs.v9pfc.mongodb.net/devTinder?retryWrites=true&w=majority&appName=NamasteNodeJs";
const connectDB = async () => {
  await mongoose.connect(URL);
};

module.exports = connectDB;
