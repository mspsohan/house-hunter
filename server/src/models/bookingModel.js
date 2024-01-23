const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({}, { strict: false, timestamps: true })

const Booking = mongoose.model("Booking", bookingSchema)

module.exports = Booking