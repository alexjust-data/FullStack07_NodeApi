const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    name: String,
    option: Boolean,  // true: se vende, false: se busca
    price: Number,
    img: String,
    tags: [String]
});

const Ad = mongoose.model('Ad', adSchema);
module.exports = Ad;