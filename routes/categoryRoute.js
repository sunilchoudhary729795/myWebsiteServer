const express = require("express");
const categoryRoute = express();
const bodyParser = require("body-parser");
const auth = require("../middleware/auth");
categoryRoute.use(express.static("public"));
categoryRoute.use(bodyParser.json());   
categoryRoute.use(bodyParser.urlencoded({extended: true}));


const categoryController = require("../controllers/categoryController");

// create category Route
categoryRoute.post(
    "/create-category",
    auth,
    categoryController.createCategory
  );

  // create viewcategory Route
  categoryRoute.get(
    "/view-Category",
    auth,
    categoryController.viewCategory
  );

  // create update category
  categoryRoute.post(
    "/update-category",
    auth,
    categoryController.updateCategory
  );

  // create delete category
  categoryRoute.get(
    "/delete-category",
    auth,
    categoryController.deleteCategory
  );

  module.exports = categoryRoute;