const mongoose = require("mongoose");
const mailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  message: {
    type: String,
    required: true,
  },
});
const modelContact = mongoose.model("Mail_Contacts", mailSchema);
module.exports = modelContact;
