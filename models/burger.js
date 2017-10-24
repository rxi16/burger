var orm = require('../config/orm.js');

// is burger a constructor? why is the b not capitalized (as cat was not capitalized)
var burger = {
  selectAll: function(cb) {
  	// I think res means response
    orm.selectAll("burgers", function(res) {
    	// does cb mean callback?
      	cb(res);
    });
  },
  // The variables cols and vals are arrays
  insertOne: function(cols, vals, cb) {
  	// remember, in orm file, insertOne had the parameters table, cols, vals, and cb
  	// so, cb is represented by function(response). 
  	// Object.hasOwnProperty() from orm.js is object the orm, or is it burgers table, or what is it
    orm.insertOne("burgers", cols, vals, function(res) {
    	// maybe cb is a method built into mysql node package
      	cb(res);
    });
  },
  updateOne: function(objColVals, condition, cb) {
  	// remember, orm file defines updateOne method, which is passed table name, objColVals, condition, and cb
  	// here, cb is represented by function(response)
    orm.updateOne("burgers", objColVals, condition, function(res) {
      	cb(res);
    });
  }
};
// Export the database functions for the controller (burgers_controller.js).
module.exports = burger;