// Author: Thomas N.    Date: 10/5/2022
//
// This file defines the schema for user objects 
// in the app's database.
// Role property are:
//   * Writer
//   * CopyEditer
//   * Admin
//   * Advisor
//

var user = require("../Server/backend");

var User = user.model("User", {
    name: String,   // Full name
    email: {type: String, required: true},  // will need to set a minimum length
    password: {type: String, required: true},
    role: {type: String, required:true, default: 'Writer'},
});

module.exports = User;

