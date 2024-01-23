const express = require('express');
const { getBooking, saveBooking, deleteBooking } = require("../controllers/bookingController")
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(saveBooking).get(protect, getBooking);

router.delete('/:id', protect, deleteBooking);

module.exports = router;