const mongoose = require("mongoose");
const schema = mongoose.Schema({
    message: {
    type: String
    },
    sender: {
    type: String
        }
    },
        {
    timestamps: true
});

module.exports = mongoose.model("messages", schema);