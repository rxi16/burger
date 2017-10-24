var connection = require('./connection.js');
 
// creates an array and turns array into a string. ["?", "?", "?"].toString() => "?,?,?";
// vals.length is passed vals.length; this may be length of column (number of rows), or number of empty cells in column...not sure
function printQuestionMarks(num) {
	var arr = [];
	// does num represent number of rows in a column? does it represent number of empty cells in a column?
  	for (var i = 0; i < num; i++) {
  		// we are pushing as many question marks as the value of num
  		// num is passed length of vals; what is vals variable? will i find it in index or main.handlebars?
  		// is it something the user inputs?
    	arr.push("?");
  	}
  	// so ["?", "?", "?"] becomes "?","?","?" rather than "?""?""?" apparently, commas are preserved
  	return arr.toString();
}
// Helper function to convert object key/value pairs to SQL syntax
// object to convert to sequel syntax or to add to sql database? gets passed an object?
// objToSql gets passed objValCols, which is represented by parameter ob, here
function objToSql(ob) {
	var arr = [];
	// loop through the keys and push the key/value as a string int arr (string integer array?)
	// does key refer to primary key i.e.id? or does it refer to column name?
	for (var key in ob) {
		// goal: to create sql statement like INSERT INTO ("?","?","?") VALUES (?,?,?);
		// remember, this code is for passing three arguments. How many arguments do I need to pass?
	    var value = ob[key];
	    // check to skip hidden properties
	    // what is the Object? Is it burgers table? burgers_db? a row?
	    if (Object.hasOwnProperty.call(ob, key)) {
	      	// if string with spaces, add quotations (black bean => 'black bean')
	      	// key value pair is also inside brackets in comment example
	      	// remember, value is assigned ob[key]
	   		if (typeof value === "string" && value.indexOf(" ") >= 0) {
	   			// value is assigned value with single quotes around it
	        	value = "'" + value + "'";
	      	}
	      	// e.g. {burger_name: 'quinoa'} => ["burger_name='quinoa'"]
	      	arr.push(key + "=" + value);
	    	}
	  	}
	// translate array of strings to a single comma-separated string
	return arr.toString();
}

var orm = {
	// why are we using tableInput rather than table as done in another method in this code?
  	selectAll: function(tableInput, cb) {
    	var queryString = "SELECT * FROM " + tableInput + ";";
    	connection.query(queryString, function(err, result) {
      		if (err) throw err;
      		cb(result);
    	});
  	},
  	// looks like insertOne means insert one row
  	insertOne: function(table, cols, vals, cb) {
  		// cols.toString is literally "?","?","?", as per printQuestionMarks helper function above
  		// cols is an array of col names
    	var queryString = "INSERT INTO " + table + " (" + cols.toString() + ") " + 
    	// we need 2 question marks without id (auto_increment), or 3 question marks with id
    	"VALUES (" + printQuestionMarks(vals.length) + ");";
    	connection.query(queryString, vals, function(err, result) {
      		if (err) throw err;
      		cb(result);
    	});
  	},
  	// are we editing values of devoured?
  	// {burger_name: quinoa, devoured: true} 
  	// objColVals is a list of properties (each of which encompasses key and value)
  	updateOne: function(table, objColVals, condition, cb) {
  		// I see condition brought up only in this updateOne method
    	var queryString = "UPDATE " + table + " SET " + objToSql(objColVals) + " WHERE " + condition + ";";
    	connection.query(queryString, function(err, result) {
      		if (err) throw err;
      		cb(result);    		
    	});
  	}
};

module.exports = orm;