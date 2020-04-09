const mongoose = require("mongoose");
const schema = mongoose.Schema({
    message: {
    type: String,
    required:true
    },
    from: {
    type: String,
    required:true
    },
    // to: {
    //     type: String,
    //     required:true
    //     },
    //     create_time: {
    //     type: Date,
    //     default : Date.now
    // }
});

module.exports = mongoose.model("messages", schema);