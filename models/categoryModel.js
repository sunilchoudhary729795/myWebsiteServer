const mongoose = require("mongoose");
const Category = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        min: 3,
        max: 20
    },
    status:{
        type: String,
        enum:["Y","N"],
        default: "Y",
      },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Category", Category);
