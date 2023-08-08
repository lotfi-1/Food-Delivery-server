/** @format */

const { getDate, getData } = require("../../config/connect");
const errorHandler = require("../../utils/errorHandler");

const getOffers = async (req, res, next) => {
  try {
    const time = new Date();
    const fullDays = `${time.getFullYear()}-${
      time.getMonth() + 1
    }-${time.getDate()}`;
    const result = await getData(
      `select * from offer where offer.date_exp >= ? `,
      [fullDays]
    );
    if (result.length > 0) {
      req.offer = result;
    }
    next();
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = getOffers;
