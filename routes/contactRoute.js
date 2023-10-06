const express = require("express");
const contactRoute = express();
const bodyParser = require("body-parser");
const auth = require("../middleware/auth");
contactRoute.use(express.static("public"));
contactRoute.use(bodyParser.json());
contactRoute.use(bodyParser.urlencoded({extended: true}));
const helper = require("../utils/helper");


const contactController = require("../controllers/contactController");

// cteate contact route
contactRoute.post(
    "/create-contact",
    contactController.createContact
);

module.exports = contactRoute;
