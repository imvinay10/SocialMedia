const port = 3000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const logStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flag: "a",
});

const errorStream = fs.createWriteStream(path.join(__dirname, "error.txt"), {
  flag: "a",
});

const authRoute = require("./routes/auth");
const jobRoute = require("./routes/job");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  const now = new Date();
  const time = `${now.toLocaleTimeString()}`;
  const log = `${req.method} ${req.originalUrl} ${time}}`;
  logStream.write(log + "\n");
  next();
});

app.use("/api/auth", authRoute);
app.use("/api/job", jobRoute);
app.use((err, req, res, next) => {
  const now = new Date();
  const time = `${now.toLocaleTimeString}`;
  const error = `${req.method} ${req.originalUrl} ${time}}`;
  errorStream.write(error + err.stack + "\n");
  res.status(500).send("Internal Server Error!");
});

app.use((req, res, next) => {
  const now = new Date();
  const time = `${now.toLocaleTimeString}`;
  const error = `${req.method} ${req.originalUrl} ${time}}`;
  errorStream.write(error + "\n");
  res.status(404).send("Route not found");
});

app.get("/", (req, res) => {
  res.send("Hello World").status(200);
});

mongoose
  .connect(
    "mongodb+srv://root:root@socialmediaapp.smqlssb.mongodb.net/?retryWrites=true&w=majority&appName=SocialMediaApp"
  )
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server is Running on ${port}`);
});
