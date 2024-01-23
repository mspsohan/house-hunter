// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;

// const Booking = require("../models/bookingModel")

const getBooking = async (req, res) => {
   res.send("get Booking")
}

const saveBooking = async (req, res) => {
   res.send("save Booking")
}

const deleteBooking = async (req, res) => {
   res.send('delete Booking')
}

module.exports = { getBooking, saveBooking, deleteBooking }