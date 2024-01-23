const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({}, { strict: false, timestamps: true })

const HouseCollection = mongoose.model("House", houseSchema)

module.exports = HouseCollection