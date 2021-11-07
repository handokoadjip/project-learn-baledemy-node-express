const express = require("express");
const mongoose = require("mongoose");

// Setting db
mongoose.connect("mongodb://localhost/mahasiswa", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("succes connected to database");
});

const app = express();
const port = 3000;

const userRouter = require("./router/users");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// views
app.set("view engine", "ejs");

// static file
app.use("/assets", express.static("public"));

// midleware
var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

//runkit.com/
https: app.get("/", (req, res) => {
  const kelas = {
    id: 1,
    title: "nodejs",
    date: req.requestTime,
  };

  res.render("pages/index", { kelas: kelas });
});

https: app.get("/about", (req, res) => {
  res.render("pages/about");
});

// https: app.get("/users", (req, res) => {
//   res.send("Users!");
// });

// https: app.post("/users", (req, res) => {
//   res.send("POST Users!");
// });

https: app.use(userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
