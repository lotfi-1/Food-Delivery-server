/** @format */

const { getData } = require("../../config/connect");
const errorHandler = require("../../utils/errorHandler");

const getFoodOffer = async (req, res, next) => {
  try {
    const time = new Date();
    const fullDays = `${time.getFullYear()}-${
      time.getMonth() + 1
    }-${time.getDate()}`;
    const result = await getData(
      `select * from food where food.id in (select food_id from food_offer where food_offer.date_exp >= ?)`,
      [fullDays]
    );
    if (result.length > 0) {
      req.foodOffers = result;
    }
    next();
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = getFoodOffer;
