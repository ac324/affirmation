//ROUTE PAGE FOR CATEGORIES
var express = require("express"),
    router  = express.Router({mergeParams:true}),
    Category = require("../models/category"),
    Phrase = require("../models/phrase");

// GET ALL CATEGORIES ROUTE    
router.get("/", function(req,res){
    Category.find({}, function(err, allCategories){
        if(err){
            console.log(err);
        } else {
            res.render("categories/index", {categories:allCategories});
        }
    });
});

// NEW CATEGORY ROUTE    
router.get("/new", function(req,res){
    res.render("categories/new");
});

// POST CATEGORY ROUTE    
router.post("/", function(req, res){
    Category.create(req.body.category, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/categories");
        }
    });
});

// SHOW CATEGORY ROUTE
router.get("/:category", function(req, res) {
    Category.findOne({name:req.params.category}, function(err, foundCategory){
        if(err || !foundCategory){
            console.log(err);
        } else {
            Phrase.find({category: foundCategory.name}, function(err, foundPhrases){
                if(err || !foundPhrases){
                    console.log(err);
                } else {
                    console.log(foundPhrases);
                    res.render("categories/show", {category: foundCategory, phrases: foundPhrases});        
                }
                
            })
            
        }
    });
});

// EDIT CATEGORY ROUTE
router.put("/:category", function(req, res){
    Category.findOneAndUpdate({name: req.params.category}, req.body.category, function(err, updatedCategory){
        if(err){
            console.log("Error: "+ err);
            res.redirect("/categories");
        } else {
            res.redirect("/categories/" + req.body.category.name);
        }
    });
});

// DESTROY CATEGORY ROUTE
router.delete("/:category", function(req, res){
    Category.findOneAndDelete({name: req.params.category}, function(err){
        if (err){
            res.redirect("/categories");
        } else {
            res.redirect("/categories");
        }
    });
});


module.exports = router;