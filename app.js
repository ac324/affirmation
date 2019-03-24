//Declare Variables
var express         = require("express"),
    app             = express(),
    howler          = require("howler"),
    mongoose        = require("mongoose"),
    Category        = require("./models/category"),
    Phrase          = require("./models/phrase"),
    methodOverride = require("method-override"),
    bodyParser      = require("body-parser");

//Routes
var indexRoutes = require("./routes/index"),
    categoryRoutes = require("./routes/categories"),
    phraseRoutes = require("./routes/phrases"),
    slideshowRoutes = require("./routes/slideshow");

//Declare App Use
mongoose.connect("mongodb://localhost/affirmations", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

//Declaring Routes
app.use(indexRoutes);
app.use("/categories", categoryRoutes);
app.use("/categories/:id/phrases", phraseRoutes);
app.use("/categories/:id/slideshow", slideshowRoutes);

//Open Ports
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Affirmation Project has started!");
});

