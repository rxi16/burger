var express = require('express');
var exphbs = require('express-handlebars');
var MO = require('method-override');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3306;

// do all applications use express package, or do some applications use mongo, for example?
var app = express();

// why is port 3000 used in burger solution, rather than 3306?
// var PORT = process.env.PORT || 3000;
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + "/public"));

// split application?
// connection between bodyParser and form?
// parse application/x-www-form-urlencoded
// divide up body inside of three stashes? is body is inside of main.handlebars?
app.use(bodyParser.urlencoded({ extended: false }));
// override with POST having ?_method=DELETE urlencoded is a method
// application use method pass method-override application, pass string underscore method
app.use(MO("_method"));
// app.engine is passed a package, namely, handlebars
// application engine method pass handlebars string (references package?) and express-handlebars method, which is 
// passed a stash to express-handlebars method do blue
// main.handlebars is inside layout or layouts directory, which is inside view or views directory
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// engine package? express method followed by set method
// setting view engine string and setting handlebars string
app.set("view engine", "handlebars");
// project name underscore controller javascript file inside of controllers directory
var routes = require("./controllers/burgers_controller.js");

// burger application use root directory routes variable
// routes is the second parameter or argument passed to use or get method "/", routes
// pass root directory and routes variable
app.use("/", routes);
app.use("/update", routes);
app.use("/create", routes);

app.listen(port, function() {
	// %s is replaced or a placeholder for port number?
  console.log("Listening on port:%s", port);
});