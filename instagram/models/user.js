const mongoose = require("mongoose");

// schema
const userSchema = new mongoose.Schema({
  first_name:{
    type: String,
    require: true
  },
  last_name: {
    type: String,
    require: true
  },
  email:{
    type: String,
    require: true,
    unique: true
  },
  user_name:{
    type: String
  }}
  ,{timestamps: true}
);

const User = mongoose.model('user',userSchema);

module.exports = User;
