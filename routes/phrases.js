//ROUTE PAGE FOR PHRASES
var express = require("express"),
    router  = express.Router({mergeParams:true}),
    Phrase = require("../models/phrase");
    
