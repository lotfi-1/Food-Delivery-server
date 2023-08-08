/** @format */

const errorHandler = require("../utils/errorHandler");
require("dotenv").config();
const axios = require("axios");

const sendSMS = async (req, res, next) => {
  try {
    const smsCode = 123456;
    const { phone } = req.body;
    // const response = await axios.post(
    //   API_URL,
    //   {
    //     username: process.env.EASY_SEND_SMS_USERNAME,
    //     password: process.env.EASY_SEND_SMS_PASSWORD,
    //     to: phone,
    //     from: process.env.EASY_SEND_SMS_SENDER_ID,
    //     text: smsCode,
    //     type: "0",
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
    //   }
    // );
    // console.log("SMS sent successfully:", response.data);
    req.smsCode = smsCode;
    next();
  } catch (error) {
    errorHandler(error,res);
  }
};

module.exports = sendSMS;

function generateSMSCode() {
  let min = 100000;
  let max = 999999;
  return Math.floor(min + Math.random() * (max - min + 1));
}
