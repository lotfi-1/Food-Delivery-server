/** @format */

const { getData } = require("../../config/connect");
const errorHandler = require("../../utils/errorHandler");

const getCategory = async (req, res, next) => {
  try {
    const result = await getData(`select * from food_category`);
    if (result.length > 0) {
      req.category = result;
    }
    next();
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = getCategory;
