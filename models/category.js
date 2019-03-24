var mongoose = require("mongoose");

var categorySchema = new mongoose.Schema({
    name: String,
    icon: String,
    phrases: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Phrase"
        }
    ]
});

module.exports = mongoose.model("Category", categorySchema);
