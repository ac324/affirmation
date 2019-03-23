var mongoose = require("mongoose");

var phraseSchema = mongoose.Schema({
    affirmation: String,
    background: String,
    category: String
});

module.exports = mongoose.model("Phrase", phraseSchema);