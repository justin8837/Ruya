var express = require("express");
var app = express();
const htmlRoutes = require("./routes/htmlRoutes")
// var apiRoutes = require("./routes/apiRoutes")

app.use(express.static("public"));

// app.use(bodyParser.urlencoded({ extended: true }));
var PORT = process.env.PORT || 8000;

// var db = require("./models");

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("You are listening to HOT " + PORT + "FM");
  });
  
  app.use("/", htmlRoutes)
  
  // app.use("/api", apiRoutes)
