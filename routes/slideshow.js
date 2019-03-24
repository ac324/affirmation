//ROUTE PAGE FOR SLIDESHOW
var express = require("express"),
    router  = express.Router({mergeParams:true}),
    Category = require("../models/category"),
    Phrase = require("../models/phrase");


router.get("/", function(req, res) {
    Category.findById(req.params.id).populate("phrases").exec(function(err, category){
        if(err){
            console.log(err);
        } else {
            console.log(category.phrases)
            res.render("slideshow/index", {category:category})
        }
    })
})

module.exports = router;