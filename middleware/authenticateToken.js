/** @format */
const errorHandler = require("../utils/errorHandler");
const { getData } = require("../config/connect");
const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Unauthorized", { statusCode: 401 });
    }
    const data = jwt.verify(token, process.env.SECRET_KEY);
    const customer = await getData(
      "select customer_id,phone,full_name from customer where customer.phone = ?",
      [data.userPhone]
    );
    req.session.customer= customer[0];
    next();
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = { authenticateToken };
