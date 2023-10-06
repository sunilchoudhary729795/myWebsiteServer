const mongoose = require("mongoose");
const Contact = mongoose.Schema({
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

    email: {
        type: String,
        required: true,
        trim: true
    },

    mobile: {
        type: Number,
        required: true,
        unique: true,
    },

    reason: {
        type: String,
        required: true,
        trim: true
    },
},
    { timestamps: true }
);

module.exports = mongoose.model("Contact", Contact);