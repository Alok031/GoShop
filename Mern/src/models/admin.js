const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  shopname: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
});

const Admin = new mongoose.model("Admin", AdminSchema);
module.exports = Admin;
