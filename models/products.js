const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

module.exports = mongoose.model('Products', new Schema({
    name: String,
    image: String,
    price: Number,
    registeredAt: { type: Date, default: Date.now }
}, {
    versionKey: false
}));