const mongoose = require("mongoose");
const Product = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    
    minLength: [4, "Product Name should have more than 4 characters"],
    maxLength: [30, "Product Name cannot exceed 30 characters"],
  },
  status: {
    type: String,
    enum: ["Y", "N"],
    default: "Y",
  },
  image: {
    type: Array,
  },
  price: {
    type: Number,
    require: true,

  },
  description: {
    type: String,
    require: true,

  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    default: null
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subCategory",
    default: null
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company",
    default: null
  },
},
  { timestamps: true }
);

module.exports = mongoose.model("Product", Product);