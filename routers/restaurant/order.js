/** @format */

const express = require("express");
const { getData } = require("../../config/connect");
const errorHandler = require("../../utils/errorHandler");
require("dotenv").config();
const router = express.Router();

router.get("/orders", async (req, res) => {
  try {
    const { id } = req.params;
    await getData(
      `select Food.*,FoodAvgRating.ratingSum,FoodAvgRating.ratingNumber
    from Food
    inner join FoodAvgRating on Food.id = FoodAvgRating.food_id
    where Food.id in (select food_id from Fav where customer_id = ? )`,
      [id]
    ).then((result) => res.status(200).json(result));
  } catch (error) {
    errorHandler(error);
  }
});
