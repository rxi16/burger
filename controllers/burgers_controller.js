var express = require("express");

// express node package contains a Router method, apparently
var router = express.Router();
// use database functions from burger module. why the adjective 'database'?
var burger = require("../models/burger.js");
// essentially Router().get("root directory", function(request, response))
router.get("/", function(req, res) {
	// remember, burger constructor from burger.js
	// selectAll method was passed tableInput and cb: is there a connection between these two
	// parameters and function(data)?
  	burger.selectAll(function(data) {
  		// is handlebars object basically the table, burgers?
    	var hbsObject = {
    		// express-handlebars required in server.js
    		// what data is being passed? data from all columns in most updated table?
      		burgers: data
    	};
    	res.render("index", hbsObject);
  	});
});
// remember, router is Router()
// does controller directory replace routes directory?
// we are posting to server?
router.post("/api/burgers", function(req, res) {
	// insertOne was passed, in orm file, table, cols, vals, and cb, I think
  	burger.insertOne(
  		["burger_name", "devoured"], 
  		// request, from html body?, burger_name and devoured
  		// array below represented by vals parameter in orm.js
  		[req.body.burger_name, req.body.devoured], 
  		// here, cb is represented by function(result)
  		function(result) {
    		// Send back the ID of the new burger
    		// since result is used here, perhaps res means response
    		// what does json method do here? is this related to one of the handlebars files?
    		// where is insertId mentioned in this code?
    		res.json({ id: result.insertId });
  		}
  	);
});
// example might be /api/burgers/1
router.put("/api/burgers/:id", function(req, res) {
	// condition was used in a queryString in orm.js file, as "WHERE" + condition + ";"
	// would not occur to me to enter req.params.id
	// id is one of the three variables. does paramters mean variables here?
  	var condition = "id = " + req.params.id;
  	// update one column (devoured) of burger object
  	// remember, updateOne is passed table, objColVals, condition, cb
  	// so, the json code is represented by objColVals
  	burger.updateOne({devoured: req.body.devoured}, condition, function(result) {
    	if (result.changedRows == 0) {
      	// If no rows were changed, then the ID must not exist, so 404
      		return res.status(404).end();
    	} 
    	else {
    		res.status(200).end();
    	}
  	});
});
// Export routes for server.js to use.
module.exports = router;

// note: we don't use app.listen here, for some reason. is it in connection.js?