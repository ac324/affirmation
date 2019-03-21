var express = require("express"),
router  = express.Router({mergeParams:true}),
Category = require("../models/category");


//ROUTES
router.get("/", function(req,res){
    Category.find({}, function(err, allCategories){
        if(err){
            console.log(err);
        } else {
            res.render("categories/index", {categories:allCategories});
        }
    });
});


module.exports = router;