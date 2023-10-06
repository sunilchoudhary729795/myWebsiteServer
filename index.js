const express = require('express');
require('dotenv').config()
const App = express();
const configFile = require("./config/config");
const host = 'localhost';
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'http://localhost';
App.use(express.static("public"));

// Allow requests from all origins
App.use(cors());


//user route
const usersRoute = require("./routes/usersRoute");
App.use("/api", usersRoute);

// category route
const categoryRoute = require("./routes/categoryRoute");
App.use("/api", categoryRoute);

// subcategory route
const subCategoryRoute = require("./routes/subCategoryRoute");
App.use("/api", subCategoryRoute);

// company Route
const companyRoute = require("./routes/companyRoute");
App.use("/api", companyRoute);

// product Route
const productRoute = require("./routes/productRoute");
App.use("/api", productRoute);

// contact Route
const contactRoute = require("./routes/contactRoute");
App.use("/api", contactRoute);


// banner Route
const bannerRoute = require("./routes/bannerRoute");
App.use("/api", bannerRoute); 


//Home Route
App.get("/", (req, res) => {
  res.status(200).send(`<!DOCTYPE html>
  <html>
    <head>
      <title>Welcome to My Node.js Server</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f2f2f2;
        }
        .container {
          margin: 100px auto;
          text-align: center;
        }
        h1 {
          font-size: 5em;
          color: #555;
          margin-bottom: 0.2em;
        }
        p {
          font-size: 1.2em;
          color: #777;
          margin-top: 0.2em;
        }
        a {
          color: #999;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to My Node.js Server</h1>
        <p>This is a simple Node.js application.</p>
        <a href="/users">View All Users</a>
      </div>
    </body>
  </html>
  `);
});

//When route is not match
App.get('*', function (req, res) {
  res.status(404).send(`<!DOCTYPE html>
  <html>
    <head>
      <title>404 Not Found</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f2f2f2;
        }
        .container {
          margin: 100px auto;
          text-align: center;
        }
        h1 {
          font-size: 5em;
          color: #555;
          margin-bottom: 0.2em;
        }
        p {
          font-size: 1.2em;
          color: #777;
          margin-top: 0.2em;
        }
        a {
          color: #999;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>404</h1>
        <p>Oops! The page you requested was not found.</p>
        <a href="/">Go back to the home page</a>
      </div>
    </body>
  </html>
  `);
});


const serverStart = async () => {
  try {
    await configFile.connectDB();
    App.listen(PORT, () => {
      console.log(`server run on link http://${host}:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

serverStart();
