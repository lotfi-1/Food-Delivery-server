/** @format */

const express = require("express");
const { getData } = require("../../config/connect");
const jwt = require("jsonwebtoken");
const { comparePasswords } = require("../../utils/comparePassword");
const errorHandler = require("../../utils/errorHandler");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const login = express.Router();

login.post("/", async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    console.log(phone)
    await getData(`select * from customer where phone = ?`, [phone]).then(
      async (result) => {
        if (result.length === 1) {
          const hashPassword = result[0].password;
          const match = await comparePasswords(password, hashPassword, res);
          if (match) {
            const token = jwt.sign({ phone: phone }, secretKey, {
              expiresIn: "24h",
            });
            const customer = {};
            for (let key in result[0]) {
              if (key !== "password") customer[key] = result[0][key];
            }
            res.status(200).json({ token, customer });
          }
        } else {
          throw new Error("invalid phone Number or password", {
            statusCode: 401,
          });
        }
      }
    );
  } catch (error) {
    errorHandler(error, res);
  }
});

module.exports = login;
