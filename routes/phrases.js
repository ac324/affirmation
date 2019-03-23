//ROUTE PAGE FOR PHRASES
var express = require("express"),
    router  = express.Router({mergeParams:true}),
    Category = require("../models/category"),
    Phrase = require("../models/phrase");

router.get("/", function(req, res) {
     Phrase.find({}, function(err, allPhrases){
        if(err){
            console.log(err);
        } else {
            res.render("phrases/index", {phrases:allPhrases});
        }
    });
})


// NEW PHRASE ROUTE
router.get("/new", function(req, res){
    Category.find({}, function(err, allCategories){
        if(err){
            console.log(err);
        } else {
            res.render("phrases/new", {categories:allCategories});
        }
    });
});

router.post("/", function(req, res){
    Phrase.create(req.body.phrase, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/categories");
        }
    })
})

module.exports = router;