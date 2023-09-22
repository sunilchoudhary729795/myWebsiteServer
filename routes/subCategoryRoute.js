const express = require("express");
const subCategoryRoute = express();
const bodyParser = require("body-parser");
const auth = require("../middleware/auth");
subCategoryRoute.use(express.static("public"));
subCategoryRoute.use(bodyParser.json());   
subCategoryRoute.use(bodyParser.urlencoded({extended: true}));


const subCategoryController = require("../controllers/subCategoryController");

// create subcategory Route

subCategoryRoute.post(
    "/create-subCategory",
    auth,
    subCategoryController.createsubCategory
  );

   // create viewcategory Route
   subCategoryRoute.get(
    "/view-subcategory",
    auth,
    subCategoryController.viewsubCategory
  );


  // create update subcategory
 subCategoryRoute.post(
  "/update-subCategory",
  auth,
  subCategoryController.updateSubCategory
 );


//  create delete subcategory
subCategoryRoute.get(
  "/delete-subCategory",
  auth,
  subCategoryController.deleteSubCategory
);

  
  module.exports = subCategoryRoute;
