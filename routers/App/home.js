/** @format */

const express = require("express");
const { getData } = require("../../config/connect");
const getOffers = require("../../middleware/app/getOffers");
const getFoodOffer = require("../../middleware/app/getFoodOffer");
const getPopularFood = require("../../middleware/app/getPopularFood");
const getCategory = require("../../middleware/app/getCategory");
const router = express.Router();

router.get(
  "/",
  // getOffers,
  // getFoodOffer,
  // getPopularFood,
  getCategory,
  (req, res) => {
    const data = {
      // offer: req.offer,
      // foodOffer: req.foodOffer,
      // popularFood: req.popularFood,
      category: req.category,
    };
    console.log(data);
    res.status(200).json(data);
  }
);

module.exports = router;
