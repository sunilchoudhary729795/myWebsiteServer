const mongoose = require("mongoose");
const Banner = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    status: {
        type: String,
        enum: ["Y", "N"],
        default: "Y"
    },

    image: {
        type: String,
        // required: true,
    },

},
    { timestamps: true }
);

module.exports = mongoose.model("Banner", Banner);