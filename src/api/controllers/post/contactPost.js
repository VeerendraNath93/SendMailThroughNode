const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const Contact = require("../../models/maildata");
const debuglogger = require("../../middleware/loggers/debugLogger");
const connectDB = require("../../config/dbConn");

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MY_MAILID,
    pass: process.env.MAIL_PASSWORD,
  },
});

// Define mail model
function mailModel(mailDetails) {
  const { name, email, subject, bodyOfTheMail } = mailDetails;
  return {
    name,
    email,
    subject,
    bodyOfTheMail,
  };
}

const contactPost = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContactMessage = new Contact({ name, email, message });

    // Connect to MongoDB before saving data
    await connectDB();
    await newContactMessage.save();
    debuglogger.info(`Data saved to the database`);
    // Disconnect from MongoDB after saving data
    mongoose.connection.close((error) => {
      if (error) {
        debuglogger.error("Error closing MongoDB connection:", error.message);
      } else {
        debuglogger.info("MongoDB connection closed successfully.");
      }
    });

    const mailDetails = {
      name,
      email,
      subject: "Message",
      bodyOfTheMail: message,
    };
    const mailOutput = mailModel(mailDetails);
    const mailOptions = {
      from: process.env.MY_MAILID,
      to: process.env.MY_MAILID,
      subject: mailOutput.subject,
      text: `NAME : ${mailOutput.name}\n\nMail sent by ${mailOutput.email}\n\n${mailOutput.bodyOfTheMail}`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
    debuglogger.info({
      status: res.statusCode,
      message: `Mail sent!`,
    });
  } catch (error) {
    res.status(500).json({ message: "Email sending failed" });
    debuglogger.error({
      status: res.statusCode,
      message: `${error.message} - Email sending failed`,
    });
  }
};

module.exports = contactPost;
