//Declare Variables
var express         = require("express"),
    app             = express(),
    howler          = require("howler"),
    mongoose        = require("mongoose"),
    Category        = require("./models/category"),
    methodOverride = require("method-override"),
    bodyParser      = require("body-parser");

var indexRoutes = require("./routes/index"),
    categoryRoutes = require("./routes/categories");

//Declare App Use
mongoose.connect("mongodb://localhost/affirmations", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

//Declaring Routes
app.use(indexRoutes);
app.use("/categories", categoryRoutes);


app.get("/categories/confidence", function(req, res) {
    res.render("confidence")
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Affirmation Project has started!")
});

