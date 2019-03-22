var mongoose = require("mongoose");

var phraseSchema = mongoose.Schema({
    affirmation: String,
    background: String,
    category: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Category"
        },
        name: String
    }
});

module.exports = mongoose.model("Phrase", phraseSchema);