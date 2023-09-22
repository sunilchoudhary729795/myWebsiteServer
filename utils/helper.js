const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const config = require("../config/config");
const path = require("path");

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(__dirname, "../public/uplodes"),
      function (error, success) {
        if (error) throw error;
      }
    );
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "_" + file.originalname.replace(/\s+/g, "");
    cb(null, name, function (error1, success1) {
      if (error1) throw error1;
    });
  },
});
const uploadImage = multer({
  storage: storage, limits: { fileSize: 1000000},
});

// const uploadImage = multer({ storage: storage });

const sendEmail = async (email, subject, message, html) => {
  try {
    const transporter = nodemailer.createTransport(config.smtp);

    const mailOptions = {
      from: config.smtp.email,
      to: email,
      subject: subject,
      text: message,
      html: html,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    res.status(400).send({ sucess: false, message: error.message });
    return false;
  }
};

// password hasing methode
const createPassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log("Error in createPassword:", error.message);
    return error.message;
  }
};

// create token
const create_token = async (data) => {
  try {
    const token = await jwt.sign({ data }, config.secret_key, {
      expiresIn: "100h", // expires in 100 hours
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

const capitalizeName = (name) => {
  const words = name.split(" ");
  const capitalizedWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const remainingLetters = word.slice(1).toLowerCase();
    return firstLetter + remainingLetters;
  });
  return capitalizedWords.join(" ");
};

const comparePassword = async (existPassword, gevenPassword) => {
  console.log(existPassword);
  console.log(gevenPassword);
  const checkPassword = await bcrypt.compare(gevenPassword,existPassword);
  if (checkPassword) {
    return true;
  }else {
    return false;
  }
}

module.exports = {
  uploadImage,
  sendEmail,
  createPassword,
  create_token,
  capitalizeName,
  comparePassword,
};