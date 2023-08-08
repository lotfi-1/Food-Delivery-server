/** @format */
const errorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Unauthorized", { statusCode: 401 });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, phone) => {
      if (err) {
        throw new Error("Invalid token", { statusCode: 403 });
      }
      req.phone = phone;
      next();
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = { authenticateToken };
