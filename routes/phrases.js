//ROUTE PAGE FOR PHRASES
var express = require("express"),
    router  = express.Router({mergeParams:true}),
    Category = require("../models/category"),
    Phrase = require("../models/phrase");

// router.get("/", function(req, res) {
//      Phrase.find({}, function(err, allPhrases){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("phrases/index", {phrases:allPhrases});
//         }
//     });
// })


// NEW PHRASE ROUTE
router.get("/new", function(req, res){
    Category.findById(req.params.id, function(err, category){
        if(err){
            console.log(err);
        } else {
            res.render("phrases/new", {category: category});    
        }
    });
});

// CREATE PHRASE ROUTE
router.post("/", function(req, res){
    Phrase.create(req.body.phrase, function(err, newPhrase){
        if(err){
            console.log(err);
        } else {
            Category.findById(req.params.id, function(err, foundCategory){
                if(err || !foundCategory){
                    console.log(err);
                } else {
                    foundCategory.phrases.push(newPhrase);
                    foundCategory.save();
                    res.redirect("/categories/" + req.params.id);
                }
            });
        }
    });
});

//EDIT FORM PHRASE ROUTE
router.get("/:phrase_id/edit", function(req, res){
    Category.findById(req.params.id, function(err, foundCategory) {
        if(err){
            console.log(err);
        } else {
            Phrase.findById(req.params.phrase_id, function(err, foundPhrase){
                if(err || !foundPhrase){
                    console.log(err);
                } else {
                    res.render("phrases/edit", {phrase: foundPhrase, category: foundCategory});    
                }
            });
        }
    })
    
   
});

//UPDATE PHRASE ROUTE
router.put("/:phrase_id", function(req, res){
    Phrase.findByIdAndUpdate(req.params.phrase_id, req.body.phrase, function(err, updatedPhrase){
        if(err){
            console.log(err);
        } else {
            res.redirect("/categories/" + req.params.id);
        }
    });
});


router.delete("/:phrase_id", function(req, res){
    Phrase.findByIdAndREmove(req.params.phrase_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/categories/"+req.params.id);
        }
    });
});


function changePhraseCategory(updatedPhrase, oldCategory, newCategory){
    Category.findOne({name: oldCategory}, function(err, oldCategory){
        if(err){
            console.log(err);
        } else {
            var phraseIndex = oldCategory.phrases.indexOf(updatedPhrase._id);
            console.log("Phrase Index: " + phraseIndex);
            oldCategory.phrases.splice(phraseIndex,1);
            oldCategory.save();
        }
    });
    Category.findOne({name: newCategory}, function(err, newUpdatedCategory){
        if(err){
            console.log(err);
        } else {
            newUpdatedCategory.phrases.push(updatedPhrase);
            newUpdatedCategory.save();
        }
    });
    console.log("Change Phrase: " + updatedPhrase.affirmation + " from Category: " + oldCategory + " to Category: " + newCategory)
} 

module.exports = router;