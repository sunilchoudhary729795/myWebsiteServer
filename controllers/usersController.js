const Users = require("../models/usersModel");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const helper = require("../utils/helper");
const randomstring = require("randomstring");
const path = require("path");
const fs = require("fs");
const { config } = require("process");
const { ObjectId } = require("mongodb");
const { verify } = require("crypto");

//register user
// module.exports.registerUser = async (req, res) => {
//   try {

//     let userExists = await Users.findOne({ email: req.body.email });

//     // console.log(user); return false;


//     // console.log(userExists);
//     // return false;

//     if (userExists) {
//       // if (req.file) {
//       //   fs.unlinkSync(req.file.path);
//       // }
//       res.status(200).send({ success: true, message: "Email already register" });

//     } else {


//       const spassword = await helper.createPassword(req.body.password);
//       const userName = await helper.capitalizeName(req.body.name);
//       const userObjectCreated = new Users({
//         name:userName,
//         email: req.body.email,
//         password: spassword,
//         mobile: req.body.mobile,
//       });

//       // if (req.file) {
//       //   userObjectCreated.image = req.file.filename;
//       // } else {
//       //   userObjectCreated.image = null; // or user.image = "";
//       // }

//       const user_data_save = await userObjectCreated.save();

//       await helper.sendEmail(
//         user_data_save.email,
//         "Thank You for register with us",
//         "Hii " + user_data_save.name,
//         `<html>
//         <body>
//           <h2>Thank You for Registering with Us</h2>
//           <p>Hi ${user_data_save.name},</p>
//           <p>Thank you for registering with our service. We're excited to have you on board!</p>
//           <p>Here are your registration details:</p>
//           <ul>
//             <li>Name: ${user_data_save.name}</li>
//             <li>Email: ${user_data_save.email}</li>
//             <li>Password: ${req.body.password}</li>
//           </ul>
//           <p>If you have any questions or need assistance, please feel free to contact us.</p>
//           <p>Best regards,</p>
//           <p>Your Company</p>
//         </body>
//       </html>`
//         // email content without image attachment
//       );

//       res.status(200).send({
//         success: true,
//         data: user_data_save,
//         message:
//           "Thank you for registering with us, " +
//           user_data_save.name +
//           "! You have received a verification email. Kindly verify.",
//       });
//     }
//   } catch (error) {
//     res.status(400).send({ success: false, message: error.message });
//   }
// };

module.exports.registerUser = async (req, res) => {
  try {
    const userName = await helper.capitalizeName(req.body.name);
    const userEmail = req.body.email;
    const userPassword = await helper.createPassword(req.body.password);
    const userMobile = req.body.mobile;
    // console.log(userName,userEmail,userMobile,userPassword);
    // return false;

    const emailExist = await Users.findOne({ email: userEmail });
    const rand = Math.random().toString(16).substr(2, 16);

    if (emailExist) {

      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      res.status(400).send({ success: true, message: "email already exist" });
    } else {
      const creatuser = new Users({
        name: userName,
        password: userPassword,
        email: userEmail,
        mobile: userMobile,
        token: rand
      });

      if (req.file) {
        creatuser.avtar = req.file.filename;
      } else {
        creatuser.avtar = null; //or user.image = ""; 
      }
      const saveUserData = await creatuser.save();

      // complete data save here

      let verifyURL = 'http://localhost:5000/api/verify-email?token=' + rand;

      // send mail to user
      const sendEmailResponce = helper.sendEmail(userEmail, 'email verification', 'please verify your email',
        `<!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Send Mail</title>
      </head>
      
      <body style="margin:0;padding:0" dir="ltr" bgcolor="#ffffff">
          <table border="0" cellspacing="0" cellpadding="0" align="center" id="m_-7626415423304311386email_table"
              style="border-collapse:collapse">
              <tbody>
                  <tr>
                      <td id="m_-7626415423304311386email_content"
                          style="font-family:Helvetica Neue,Helvetica,Lucida Grande,tahoma,verdana,arial,sans-serif;background:#ffffff">
                          <table border="0" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">
                              <tbody>
                                  <tr>
                                      <td height="20" style="line-height:20px" colspan="3">&nbsp;</td>
                                  </tr>
                                  <tr>
                                      <td height="1" colspan="3" style="line-height:1px"></td>
                                  </tr>
                                  <tr>
                                      <td>
                                          <table border="0" width="100%" cellspacing="0" cellpadding="0"
                                              style="border-collapse:collapse;text-align:center;width:100%">
                                              <tbody>
                                                  <tr>
                                                      <td width="15px" style="width:15px"></td>
                                                      <td style="line-height:0px;max-width:600px;padding:0 0 15px 0">
                                                          <table border="0" width="100%" cellspacing="0" cellpadding="0"
                                                              style="border-collapse:collapse">
                                                              <tbody>
                                                                  <tr>
                                                                      <td style="width:100%;text-align:left;height:33px"><img
                                                                              height="33"
                                                                              src="https://www.badabazaars.com/web/design_img/bada.png"
                                                                              style="border:0" class="CToWUd" data-bit="iit">
                                                                      </td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                      <td width="15px" style="width:15px"></td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td>
                                          <table border="0" width="430" cellspacing="0" cellpadding="0"
                                              style="border-collapse:collapse;margin:0 auto 0 auto">
                                              <tbody>
                                                  <tr>
                                                      <td>
                                                          <table border="0" width="430px" cellspacing="0" cellpadding="0"
                                                              style="border-collapse:collapse;margin:0 auto 0 auto;width:430px">
                                                              <tbody>
                                                                  <tr>
                                                                      <td width="15" style="display:block;width:15px">
                                                                          &nbsp;&nbsp;&nbsp;</td>
                                                                  </tr>
                                                                  <tr>
                                                                      <td>
                                                                          <table border="0" width="100%" cellspacing="0"
                                                                              cellpadding="0"
                                                                              style="border-collapse:collapse">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td>
                                                                                          <table border="0" cellspacing="0"
                                                                                              cellpadding="0"
                                                                                              style="border-collapse:collapse">
                                                                                              <tbody>
                                                                                                  <tr>
                                                                                                      <td width="20"
                                                                                                          style="display:block;width:20px">
                                                                                                          &nbsp;&nbsp;&nbsp;
                                                                                                      </td>
                                                                                                      <td>
                                                                                                          <table border="0"
                                                                                                              cellspacing="0"
                                                                                                              cellpadding="0"
                                                                                                              style="border-collapse:collapse">
                                                                                                              <tbody>
                                                                                                                  <tr>
                                                                                                                      <td>
                                                                                                                          <p
                                                                                                                              style="margin:10px 0 10px 0;color:#565a5c;font-size:18px">
                                                                                                                              Hi
                                                                                                                              ${userName}!
                                                                                                                          </p>
                                                                                                                          <p
                                                                                                                              style="margin:10px 0 10px 0;color:#565a5c;font-size:18px">
                                                                                                                              You
                                                                                                                              updated
                                                                                                                              your
                                                                                                                              <span
                                                                                                                                  class="il">email</span>
                                                                                                                              address
                                                                                                                              to
                                                                                                                              <span
                                                                                                                                  style="color:#2b5a83"
                                                                                                                                  id="m_-7626415423304311386body_email"><a
                                                                                                                                      href="mailto:${userEmail}"
                                                                                                                                      target="_blank">${userEmail}</a></span>.
      
                                                                                                                              <a
                                                                                                                                  href="${verifyURL}">
                                                                                                                                  <span
                                                                                                                                      class="il">Confirm</span>
                                                                                                                                  your
                                                                                                                                  <span
                                                                                                                                      class="il">email</span>
      
                                                                                                                              </a>
                                                                                                                              address
                                                                                                                              to
                                                                                                                              continue
                                                                                                                              capturing
                                                                                                                              and
                                                                                                                              sharing
                                                                                                                              your
                                                                                                                              moments
                                                                                                                              with
                                                                                                                              the
                                                                                                                              world.
                                                                                                                          </p>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                                  <tr>
                                                                                                                      <td height="20"
                                                                                                                          style="line-height:20px">
                                                                                                                          &nbsp;
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                                  <tr>
                                                                                                                      <td><a href="${verifyURL}"
                                                                                                                              style="color:#1b74e4;text-decoration:none;display:block;width:370px"
                                                                                                                              target="_blank"
                                                                                                                              data-saferedirecturl="">
                                                                                                                              <table
                                                                                                                                  border="0"
                                                                                                                                  width="390"
                                                                                                                                  cellspacing="0"
                                                                                                                                  cellpadding="0"
                                                                                                                                  style="border-collapse:collapse">
                                                                                                                                  <tbody>
                                                                                                                                      <tr>
                                                                                                                                          <td
                                                                                                                                              style="border-collapse:collapse;border-radius:3px;text-align:center;display:block;border:solid 1px #009fdf;padding:10px 16px 14px 16px;margin:0 2px 0 auto;min-width:80px;background-color:#47a2ea">
                                                                                                                                              <a href=""
                                                                                                                                                  style="color:#1b74e4;text-decoration:none;display:block"
                                                                                                                                                  target="_blank"
                                                                                                                                                  data-saferedirecturl="">
                                                                                                                                                  <center>
                                                                                                                                                      <font
                                                                                                                                                          size="3">
                                                                                                                                                          <span
                                                                                                                                                              style="font-family:Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;white-space:nowrap;font-weight:bold;vertical-align:middle;color:#fdfdfd;font-size:16px;line-height:16px"><span
                                                                                                                                                                  class="il">Confirm</span>&nbsp;<span
                                                                                                                                                                  class="il">email</span>&nbsp;address</span>
                                                                                                                                                      </font>
                                                                                                                                                  </center>
                                                                                                                                              </a>
                                                                                                                                          </td>
                                                                                                                                      </tr>
                                                                                                                                  </tbody>
                                                                                                                              </table>
                                                                                                                          </a>
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                                  <tr>
                                                                                                                      <td height="20"
                                                                                                                          style="line-height:20px">
                                                                                                                          &nbsp;
                                                                                                                      </td>
                                                                                                                  </tr>
                                                                                                              </tbody>
                                                                                                          </table>
                                                                                                      </td>
                                                                                                  </tr>
                                                                                              </tbody>
                                                                                          </table>
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </td>
                                                                  </tr>
                                                                  <tr>
                                                                      <td height="10" style="line-height:10px" colspan="1">
                                                                          &nbsp;</td>
                                                                  </tr>
                                                              </tbody>
                                                          </table>
                                                      </td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td>
                                          <table border="0" cellspacing="0" cellpadding="0"
                                              style="border-collapse:collapse;margin:0 auto 0 auto;width:100%;max-width:600px">
                                              <tbody>
                                                  <tr>
                                                      <td height="4" style="line-height:4px" colspan="3">&nbsp;</td>
                                                  </tr>
                                                  <tr>
                                                      <td width="15px" style="width:15px"></td>
                                                      <td width="20" style="display:block;width:20px">&nbsp;&nbsp;&nbsp;</td>
                                                      <td style="text-align:center">
                                                          <div style="padding-top:10px;display:flex">
                                                              <div style="margin:auto"><img
                                                                      src="https://www.badabazaars.com/web/design_img/bada.png"
                                                                      height="26" width="52" alt="" class="CToWUd"
                                                                      data-bit="iit"></div><br>
                                                          </div>
                                                          <div style="height:10px"></div>
                                                          <div style="color:#abadae;font-size:11px;margin:0 auto 5px auto">©
                                                              Instagram. Meta Platforms,
                                                              Inc., 1601 Willow Road, Menlo Park, CA 94025<br></div>
                                                          <div style="color:#abadae;font-size:11px;margin:0 auto 5px auto">If
                                                              you didn't change your
                                                              Instagram <span class="il">email</span> address, <a href=""
                                                                  style="color:#abadae;text-decoration:underline"
                                                                  target="_blank"
                                                                  data-saferedirecturl="https://www.google.com/url?q=https://instagram.com/accounts/remove/revoke_wrong_email/?uidb36%3Dn752wk1%26token%3D5zw-22ded54809dcbad9c7a4d6282b8ed7fb%26nonce%3DBoDUVCNb%26encoded_email%3DcnVhc2luZ2hlMDFAZ21haWwuY29t&amp;source=gmail&amp;ust=1658914278556000&amp;usg=AOvVaw3Oe3Hp81PQfDyukdRF_9vN">revert
                                                                  this change</a>.<br></div>
                                                      </td>
                                                      <td width="20" style="display:block;width:20px">&nbsp;&nbsp;&nbsp;</td>
                                                      <td width="15px" style="width:15px"></td>
                                                  </tr>
                                                  <tr>
                                                      <td height="32" style="line-height:32px" colspan="3">&nbsp;</td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td height="20" style="line-height:20px" colspan="3">&nbsp;</td>
                                  </tr>
                              </tbody>
                          </table><span><img src="https://www.badabazaars.com/web/design_img/bada.png"
                                  style="border:0;width:1px;height:1px" class="CToWUd" data-bit="iit"></span>
                      </td>
                  </tr>
              </tbody>
          </table>
      </body>
      
      </html>`);

      res.status(200).send({ success: true, message: `Thank you ${userName} for connect with us.` });
    }

  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};


module.exports.verifyEmail = async (req, res) => {
  try {
    const userToken = req.query.token;
    const findToken = await Users.findOne({ token: userToken });
    // console.log(findToken);
    // return false;
    if (findToken) {
      const updateStatus = await Users.updateOne({ token: userToken }, { $set: { status: "Y", token: null }, });
      res.status(200).send({ success: true, message: "your email has been verify successfully" });
    } else {
      res.status(400).send({ success: false, message: "invalid Token" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message })
  }
}

module.exports.loginUser = async (req, res) => {
  try {
    // console.log(loginEmail);
    // return false;
    const loginEmail = req.body.email;
    const loginPass = req.body.password;

    if (loginEmail == null) {
      res.status(400).send({ success: false, message: "please enter a email" });
      return false;
    } else if (loginPass == null) {
      res.status(400).send({ success: false, message: "please provide password" });
      return false;
    }

    const emailExist = await Users.findOne({ email: loginEmail }, { name: 1, email: 1, password: 1, role: 1, mobile: 1, status: 1, avtar: 1 });

    if (emailExist) {

      if (emailExist.status == "N") {
        res.status(400).send({ success: false, message: "You have recieved a verification email Kindly confirm to activate you account." })
      };
      const checkPassword = await helper.comparePassword(emailExist.password, loginPass);
      if (checkPassword) {

        const token = await helper.create_token({ _id: emailExist._id });
        if (emailExist.avtar) {
          var userProfile = `${process.env.FILE_PATH}/${emailExist.avtar}`;
        } else {
          var userProfile = `${process.env.DEFAULT_IMAGE}`;
        }
        const data = {
          name: emailExist.name,
          avtar: userProfile,
          token: token
        };
        res.status(200).send({ success: true, message: "login success", data });
        return false;
      } else {
        res.status(400).send({ success: false, message: "invalid password" });
        return false;
      }
    } else {
      res.status(400).send({ success: false, message: "Email not found" });
    }
    // console.log(emailExist);
    // return false;
  } catch (error) {
    console.log('Error from login function', error);
  }
};

module.exports.userProfile = async (req, res) => {
  try {

    // console.log(req.user.data);
    // return false;
    const tokenDecriptData = req.user.data;
    const findUser = await Users.findOne({ _id: new ObjectId(tokenDecriptData._id) });

    const data = {
      name: findUser.name,
      email: findUser.email,
      mobile: findUser.mobile,
      role: findUser.role
    }

    res.status(200).send({ success: true, message: "User Details", data });
  } catch (error) {
    console.log("Error form userProfile function : ", error);
  }
}

module.exports.updateProfile = async (req, res) => {
  try {
  
    const { name, mobile } = req.body;

    const { _id } = req.user.data;
    const findProfile = await Users.findOne({ _id });
   
    if (findProfile) {
      let condition = {};

      if (name) {
        condition.name = await helper.capitalizeName(name);
      };
      if (mobile) {
        if (mobile.length == 10) {
          condition.mobile = mobile;
        } else {
          res.status(400).send({ success: false, message: "invailed number" });
        }

      };

      const updateName = await Users.updateOne({ _id }, { $set: { name: name, mobile: mobile } });
      console.log(updateName);

      res.status(200).send({ success: true, message: "Profile Update Successfull", data: condition });

    } else {
      // console.log("else");//
      res.status(400).send({ success: false, message: "Failed Profile Update" });
    };
    return false;

  } catch (error) {
    console.log("Error form updateProfile function : ", error);

  };
};

module.exports.deleteAllUser = async (req, res) => {
  try {
    const deleteAllUser = await Users.deleteMany({ role: "user" });
    res.status(200).send({ success: true, message: "All User has been delete successfully" });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports.viewAllUser = async (req, res) => {
  try {
    const viewAllUser = await Users.find({ role: "user" }, { _id: 0, name: 1, email: 1, role: 1, mobile: 1, status: 1, avtar: 1 });


    var getAllUsers = viewAllUser.map((user) => {
      return {
        ...user.toObject(),
        avtar: `${process.env.FILE_PATH}/${user.avtar}`
      };
    });

    console.log(getAllUsers);

    res.status(200).send({ success: true, message: "All User viewed successfully", data: getAllUsers });
  } catch (error) {
    // res.status(400).send({success: false, message: error.message});
    console.log("Error from viewAllUser Function", error);
  }

};


module.exports.changePassword = async (req, res) => {
  try {
    const { _id } = req.user.data;
    const { oldPassword, newPassword } = req.body;
    
    const findProfile = await Users.findOne({ _id });
    
    if (findProfile) {
      const checkPassword = await helper.comparePassword(findProfile.password, oldPassword);
      if (checkPassword) {
        if (newPassword.length >= 6) {
          const createPassword = await helper.createPassword(newPassword);
          const updatePassword = await Users.updateOne({ _id }, { $set: { password: createPassword } });
          res.status(200).send({ success: true, message: "Password Updated Successfully" });
          const sendMailResponse = await helper.sendEmail(findProfile.email, "Password Update", "Your Password Updated Successfully", `<p><b>Your Password Updated Successfully.</b></p> 
          <br>
          <p>Email : ${findProfile.email} <br> Password :  ${newPassword}`);
        } else {
          res.status(400).send({ success: false, message: "Password to Short" });
        }
      } else {
        res.status(400).send({ success: false, message: "Old Password not match" });
      }
    }

  } catch (error) {
    console.log("Error from updatePassword function", error);
  }
}









//login Method
// module.exports.user_login = async (req, res) => {
//   try {
//     const email = req.body.email;
//     const password = req.body.password;
//     let userExist = await User.findOne({ email: email });

//     if (userExist) {
//       const passwordMatch = await bcryptjs.compare(
//         password,
//         userExist.password
//       );
//       if (passwordMatch) {
//         const tokenData = await helper.create_token(userExist._id);
//         const userData = {
//           _id: userExist._id,
//           name: userExist.name.toUpperCase(),
//           password: userExist.password,
//           image: userExist.image,
//           mobile: userExist.mobile,
//           role: userExist.role,
//           token: tokenData,
//         };

//         const response = {
//           success: true,
//           message: "Login Successfully",
//           data: userData,
//         };
//         res.status(200).send(response);
//       } else {
//         res
//           .status(400)
//           .send({ success: false, message: "Login details are incorrect" });
//       }
//     } else {
//       res
//         .status(400)
//         .send({ success: false, message: "Login details are incorrect" });
//     }
//   } catch (error) {
//     res.status(400).send({ sucess: false, message: error.message });
//   }
// };

// //get all users
// module.exports.get_users = async (req, res) => {
//   try {
//     const users = await User.find({});

//     // Add the image URL to each user's image property
//     const usersWithImageUrls = users.map((user) => {
//       return {
//         ...user.toObject(),
//         image:
//           req.protocol + "://" + req.get("host") + "/api/uploads/" + user.image,
//       };
//     });

//     res.status(200).send({
//       success: true,
//       message: "Authentication",
//       data: usersWithImageUrls,
//     });
//   } catch (error) {
//     res.status(400).send({ sucess: false, message: error.message });
//   }
// };

// //update password methode
// module.exports.update_password = async (req, res) => {
//   try {
//     const user_id = req.body.user_id;
//     const password = req.body.password;

//     // Check if any of the fields are empty
//     if (!user_id || !password) {
//       return res.status(400).json({
//         success: false,
//         error: "Both user id and password are required.",
//       });
//     }

//     const isValid = await User.findOne({ _id: ObjectId(user_id) });
//     if (isValid) {
//       const newpassword = await helper.createPassword(password);

//       const updateUser = await User.findByIdAndUpdate(
//         { _id: ObjectId(user_id) },
//         {
//           $set: {
//             password: newpassword,
//           },
//         }
//       );
//       res.status(200).send({
//         success: true,
//         message: "Password has been update successfully.",
//       });
//     } else {
//       res.status(200).send({ success: false, message: "Invalid user id" });
//     }
//   } catch (error) {
//     res.status(400).send({ sucess: false, message: error.message });
//   }
// };

// // forget password
// module.exports.forget_password = async (req, res) => {
//   try {
//     const email = req.body.email;
//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         error: "email are required.",
//       });
//     }
//     const findUser = await User.findOne({ email: email });
//     if (findUser) {
//       const generateToken = randomstring.generate();
//       await User.updateOne(
//         { email: email },
//         {
//           $set: {
//             token: generateToken,
//           },
//         }
//       );
//       console.log(generateToken);
//       await helper.sendEmail(
//         email,
//         "Update Password",
//         "We have send mail to your mail kidly check and verify.",
//         "<p>Hii " +
//           findUser.name +
//           ', Please copy the link and <a href="http://localhost:5000/api/reset-password?token=' +
//           generateToken +
//           '"> Reset your password</a>'
//       );

//       return res.status(200).json({
//         success: true,
//         message: "We have send mail to your mail kidly check and verify.",
//       });
//     } else {
//       res.status(200).send({
//         sucess: true,
//         message: "This email does not exist",
//       });
//       return false;
//     }
//   } catch (error) {
//     res.status(400).send({ sucess: false, message: error.message });
//     return false;
//   }
// };

// //reset passoword
// module.exports.reset_password = async (req, res) => {
//   try {
//     const token = req.query.token;
//     const findUser = await User.findOne({ token: token });
//     const password = req.body.password;
//     if (findUser && password) {
//       const newPassword = await helper.createPassword(password);
//       const userData = await User.findByIdAndUpdate(
//         { _id: ObjectId(findUser._id) },
//         { $set: { password: newPassword, token: null } },
//         { new: true }
//       );

//       res.status(200).send({
//         sucess: true,
//         message: "Password has reset successfully",
//         data: userData,
//       });
//       return false;
//     } else {
//       res
//         .status(400)
//         .send({ sucess: false, message: "This Link has been expired" });
//       return false;
//     }
//   } catch (error) {
//     res.status(400).send({ sucess: false, message: error.message });
//     return false;
//   }
// };