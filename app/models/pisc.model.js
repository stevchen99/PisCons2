const mongoose = require('mongoose');

const piscSchema = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now },
    pool: String,
    point: Number,
    isAdd: Boolean
});

module.exports = mongoose.model('piscModel', piscSchema, 'PointPiscine');