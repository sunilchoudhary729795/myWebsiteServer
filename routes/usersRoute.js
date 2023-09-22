const express = require("express");
const usersRoute = express();
const bodyParser = require("body-parser");
const auth = require("../middleware/auth");
const helper = require("../utils/helper");
usersRoute.use(express.static("public"));
usersRoute.use(bodyParser.json());
usersRoute.use(bodyParser.urlencoded({ extended: true }));


const usersController = require("../controllers/usersController");
//register api
usersRoute.post(
  "/register-user",
  helper.uploadImage.single("avtar"),
  usersController.registerUser
);

usersRoute.post(
  "/login-user",
  usersController.loginUser
);

usersRoute.post(
  "/user-profile",
  auth,
  usersController.userProfile
);

usersRoute.post(
  "/change-password",
  auth,
  usersController.changePassword
);


usersRoute.post(
  "/update-profile",
  auth,
  usersController.updateProfile
  
);

usersRoute.get(
  "/delete-all-user",
  auth,
  usersController.deleteAllUser 
);

usersRoute.get(
  "/view-all-user",
  auth,
  usersController.viewAllUser 
);

usersRoute.get(
  "/verify-email",
  usersController.verifyEmail
)


// login api
// usersRoute.post("/login", usersController.user_login);

// // update password route
// usersRoute.post("/update-password", auth, usersController.update_password);

// //forget password route
// usersRoute.post("/forget-password", usersController.forget_password);

// //reset password 
// usersRoute.get("/reset-password", usersController.reset_password);

// // get users api
// usersRoute.get("/getUsers", auth, usersController.get_users);



module.exports = usersRoute;