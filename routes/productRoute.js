const express = require("express");
const productRoute = express();
const bodyParser = require("body-parser");
const auth = require("../middleware/auth");
productRoute.use(express.static("public"));
productRoute.use(bodyParser.json());
productRoute.use(bodyParser.urlencoded({ extended: true }));
const helper = require("../utils/helper")

const productController = require("../controllers/productController");

// create product Route
productRoute.post(
  "/create-product",
  helper.uploadImage.array("image",10),
  auth,
  productController.createProduct
);

// create viewproduct Route
productRoute.get(
  "/view-product",
  auth,
  productController.viewProduct
);

// search
productRoute.get(
  "/search-product",
  productController.searchProduct
);

// create update product
productRoute.post(
  "/update-product",
  auth,
  productController.updateProduct
);

// delete product
productRoute.get(
  "/delete-product",
  auth,
  productController.deleteProduct
);






module.exports = productRoute;