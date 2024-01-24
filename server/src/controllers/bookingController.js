// const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;

const Booking = require("../models/bookingModel")

const getBooking = async (req, res) => {
   try {
      const userEmail = req.user.email;

      const bookings = await Booking.find({ renterEmail: userEmail });

      res.status(200).json(bookings);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
   }
};


const saveBooking = async (req, res) => {
   try {
      const houseData = req.body;

      const userBookingCount = await Booking.countDocuments({
         renterEmail: houseData.renterEmail,
      });

      if (userBookingCount >= 2) {
         return res.status(400).json({ error: "You can only book a maximum of two houses." });
      }

      const existingBooking = await Booking.findOne({
         renterEmail: houseData.renterEmail,
         houseId: houseData.houseId,
      });

      if (existingBooking) {
         return res.status(400).json({ error: "You have already booked this house." });
      }

      const booking = await Booking.create(houseData);

      res.status(201).json(booking);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
   }
};



const deleteBooking = async (req, res) => {
   res.send('delete Booking')
}

module.exports = { getBooking, saveBooking, deleteBooking }