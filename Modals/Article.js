// Author: Thomas N.  Date: 10/5/2022
//
// This file defines the schema for Article objects.
//

var draft = require("../Server/backend");

var article = draft.model("article", {
    Author: {type: String, required: true}, // owner's email
    Headlines: {type: String, required: true},
    PublishDate: {type: Date, min: new Date("2004-08-15"), default: Date.now},
    CreatedDate: {type: Date, min: new Date("2004-08-15"), default: Date.now, required: true}, 
    Tags:  {type: String, required: true},
    Body:  {type: String, required: true},
    //ImageSources: {type: Number, min: 0, max: 59, required: true}, Add later
    Citations: {type: String, required: true},
    IsDraft: {type: Boolean, default: true},
});

module.exports = article;