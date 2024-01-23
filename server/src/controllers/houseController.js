const HouseCollection = require("../models/houseModel");

const getHomes = async (req, res) => {
   const { email } = req.query
   try {
      const result = await HouseCollection.find({ ownerEmail: email })
      res.status(201).json(result)
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
   }
}

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

module.exports = { getHomes, addHouse };
