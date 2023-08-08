/** @format */

const { getData } = require("../config/connect");
const errorHandler = require("../utils/errorHandler");

const checkPhone = async (req, res, next) => {
  try {
    const { phone } = req.body;
    await getData("select phone from customer where customer.phone = ?", [
      phone,
    ]).then((result) => {
      if (result.length > 0)
        throw new Error("phone Number already exist", { statusCode: 401 });
      else next();
    });
  } catch (error) {
    errorHandler(error,res);
  }
};

module.exports = checkPhone;
