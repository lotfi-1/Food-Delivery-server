/** @format */

const express = require("express");
const { getData } = require("../../config/connect");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const errorHandler = require("../../utils/errorHandler");
const sendSMS = require("../../middleware/sendSms");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;
const register = express.Router();
const checkPhone = require("../../middleware/checkPhone");

function setData(req, res, next) {
  req.app.set("smsCode", req.smsCode);
  next();
}
// sendSMS, setData
register.post("/", checkPhone, sendSMS, async (req, res) => {
  res.status(200).json({ message: "code Otp send successfully" });
});

register.post("/verify", checkPhone, async (req, res) => {
  try {
    const smsCode = req.session.smsCode;
    const { phone, password, name, code } = req.body;
    console.log(smsCode === code);
    if (smsCode !== code) res.status(401).json({ message: "invalid code Otp" });
    else {
      const hashPassword = await bcrypt.hash(password, 10);
      if (!hashPassword) {
        throw new Error("Error occurred during register", { statusCode: 401 });
      }
      await getData(
        `insert into customer (phone,password,full_name) values (?,?,?)`,
        [phone, hashPassword, name]
      );
      const result = await getData(
        "select customer_id,phone,full_name from customer where customer.phone = ?",
        [phone]
      );
      
      const customer = result[0];
      const token = jwt.sign({ userPhone: phone }, secretKey, {
        expiresIn: "24h",
      });
      res.status(200).json({ token, customer });
    }
  } catch (error) {
    errorHandler(error, res);
  }
});
module.exports = register;
