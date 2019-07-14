var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
// var cheerio = require("cheerio");
// var axios = require("axios");

var db = require("./models");

// Express server setup
var PORT = process.env.PORT || 3000;

// DB setup
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

var app = express();

// Static public route
app.use(express.static("public"));

// Middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/controller.js");

app.use(routes);

app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
