const express = require("express");
const routes = express.Router();
const contactPost = require("../../controllers/post/contactPost");
routes.post("/", contactPost);
module.exports = routes;

