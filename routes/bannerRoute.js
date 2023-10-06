const express = require("express");
const bannerRoute = express();
const bodyParser = require("body-parser");
const auth = require("../middleware/auth");
bannerRoute.use(express.static("public"));
bannerRoute.use(bodyParser.json());
bannerRoute.use(bodyParser.urlencoded({extended: true}));
const helper = require("../utils/helper");


const bannerController = require("../controllers/bannerController");

// cteate contact route
bannerRoute.post(
    "/create-banner",
    bannerController.createBanner
);

module.exports = bannerRoute;
