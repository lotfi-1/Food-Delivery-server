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

register.post("/", checkPhone, sendSMS, setData, async (req, res) => {
  res.status(200).json({ message: "code Otp send successfully" });
});

register.post("/verify", checkPhone, async (req, res) => {
  try {
    const smsCode = req.app.get("smsCode");
    const { phone, password, name, code } = req.body;
    console.log(smsCode, code);
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
      const token = jwt.sign({ phone: phone }, secretKey, { expiresIn: "24h" });
      console.log(token);
      res.status(200).json({ token });
    }
  } catch (error) {
    errorHandler(error, res);
  }
});
module.exports = register;
