const express = require("express");
const companyRoute = express();
const bodyParser = require("body-parser");
const auth = require("../middleware/auth");
companyRoute.use(express.static("public"));
companyRoute.use(bodyParser.json());   
companyRoute.use(bodyParser.urlencoded({extended: true}));


const companyController = require("../controllers/companyController");
// create company Route
companyRoute.post(
    "/create-company",
    auth,
    companyController.createCompany
  );


   // create company Route
   companyRoute.get(
    "/view-company",
    auth,
    companyController.viewCompany
  );

  // create update company
  companyRoute.post(
    "/update-company",
    auth,
    companyController.updateCompany
  );

  // create delete company
  companyRoute.get(
    "/delete-company",
    auth,
    companyController.deleteCompany
  );

  module.exports = companyRoute;