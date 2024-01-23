const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const HouseCollection = require("../models/houseModel");

const getAllHouse = async (req, res) => {
   try {
      const { page = 0, rowsPerPage = 10 } = req.query;
      const skip = page * rowsPerPage;

      const { house, city, bedroom, bathroom, roomSize, availability, rangeValue } = req.query;

      const filter = {};

      if (house) filter.houseName = { $regex: new RegExp(house, 'i') };
      if (city) filter.city = { $regex: new RegExp(city, 'i') };
      if (bedroom) filter.bedroom = bedroom;
      if (bathroom) filter.bathroom = bathroom;
      if (roomSize) filter.roomSize = { $lte: parseInt(roomSize) };
      if (availability) filter.availability = availability;
      if (rangeValue) filter.rent = { $lte: parseInt(rangeValue) };

      const totalCount = await HouseCollection.countDocuments(filter);

      const result = await HouseCollection.find(filter)
         .skip(skip)
         .limit(parseInt(rowsPerPage));

      res.status(200).json({ result, totalCount });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
   }
};




const getHomes = async (req, res) => {
   const { email, id } = req.query;

   try {
      let query = { ownerEmail: email };

      if (id) {
         query._id = new ObjectId(id);
      }

      const result = await HouseCollection.find(query);
      res.status(200).json(result);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
   }
};

module.exports = { getHomes };


const addHouse = async (req, res) => {
   try {
      const houseData = req.body;

      const house = await HouseCollection.create(houseData);

      res.status(201).json(house);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
   }
};

const deleteHouse = async (req, res) => {
   const id = req.params.id;
   console.log(id)

   try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).json({ error: 'Invalid ObjectId' });
      }

      const result = await HouseCollection.findOneAndDelete({ _id: new ObjectId(id) });

      if (!result) {
         return res.status(404).json({ error: 'House not found' });
      }

      res.status(200).json({ message: 'House deleted successfully' });
   } catch (error) {
      console.error('Error deleting house:', error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
};

const updateHouse = async (req, res) => {
   const { id } = req.params;

   const { houseName, address, city, bedroom, bathroom, roomSize, availability, rent, number, description, picture, houseOwner, ownerEmail } = req.body;
   const query = { _id: new ObjectId(id) }

   try {
      const updatedHouse = await HouseCollection.findByIdAndUpdate(query,
         {
            $set: {
               houseName,
               address,
               city,
               bedroom,
               bathroom,
               roomSize,
               availability,
               rent,
               number,
               description,
               picture,
               houseOwner,
               ownerEmail,
            }
         },
         { new: true }
      );

      if (!updatedHouse) {
         return res.status(404).json({ message: 'House not found' });
      }

      res.status(200).json(updatedHouse);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
}

module.exports = { getHomes, getAllHouse, addHouse, deleteHouse, updateHouse };
