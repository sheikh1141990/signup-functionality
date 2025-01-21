const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const app = express();
const jwtSecret = process.env.JWT_SECRET;
console.log("JWT Secret:", process.env.JWT_SECRET);

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST, // if the server is live we need to put the IP address of the live server here, for now its local
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory)); // so it can use all the HTML CSS files we have


// // // to be done once we have controllers
// // Parse URL encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));

// // Parse JSOM bodies (as sent by API clients)
app.use(express.json());


app.set("view engine", "hbs");

db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("DB Connected");
  }
});

// Middleware to log requests
// app.use((req, res, next) => {
    // console.log(`Incoming ${req.method} request to ${req.originalUrl}`);
    // next();
//   });
// 

// // route
// app.get("/", (req, res) => {
// //   res.send("<ht>Home</h1>");

//     res.render('index')
// });
// app.get("/register", (req, res) => {
// //   res.send("<ht>Home</h1>");

//     res.render('register')
// });

// // Define Routes in another way

app.use("/", require("./routes/pages"));

app.use("/auth", require("./routes/auth"));

app.listen(5000, () => {
  console.log("Server Started on Port 5000");
});
