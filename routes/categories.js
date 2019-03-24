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

// SHOW SINGLE CATEGORY ROUTE
router.get("/:id", function(req, res) {
    Category.findById(req.params.id).populate("phrases").exec(function(err,foundCategory){
        if(err || !foundCategory){
            console.log(err);
        } else {
            res.render("categories/show", {category: foundCategory});        
        }
    });
});

// UPDATE CATEGORY ROUTE
router.put("/:id", function(req, res){
    Category.findByIdAndUpdate(req.params.id, req.body.category, function(err, updatedCategory){
        if(err){
            console.log("Error: "+ err);
            res.redirect("/categories");
        } else {
            res.redirect("/categories/" + req.params.id);
        }
    });
});

// DESTROY CATEGORY ROUTE
router.delete("/:id", function(req, res){
    Category.findByIdAndDelete(req.params.id, function(err){
        if (err){
            res.redirect("/categories");
        } else {
            res.redirect("/categories");
        }
    });
});

router.get("/slideshow", function(req, res) {
    res.send("hey yo")
})

module.exports = router;