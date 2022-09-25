const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8000;
const URL =
  "mongodb+srv://userUser:userUser@todo.rkrgaa6.mongodb.net/?retryWrites=true&w=majority";

app.use(bodyParser.json({ extended: true }));
MongoClient.connect(URL, (err, database) => {
  if (err) return console.log(err);
  const myDB = database.db("todo");
  require("./index.js")(app, myDB);
  app.listen(port, () => {
    console.log("Start on " + port);
  });
});
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});
