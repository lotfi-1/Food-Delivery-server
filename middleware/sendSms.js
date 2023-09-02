/** @format */

const errorHandler = require("../utils/errorHandler");
require("dotenv").config();
const axios = require("axios");

const smsText = (smsCode) => `
<strong>Verify User Account:</strong><br>
Hello there! Your verification code is: ${smsCode}.<br>
Thank you for using our service!
`;

const sendSMS = async (req, res, next) => {
  try {
    const smsCode = generateSMSCode();
    const { phone } = req.body;
    const payload = `username=${process.env.EASY_SEND_SMS_USERNAME}
    &password=${process.env.EASY_SEND_SMS_PASSWORD}
    &to=${phone}
    &from=${process.env.EASY_SEND_SMS_SENDER_ID}
    &text=${smsCode},
    &type=0`;
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: "ASPSESSIONIDASCQBARR=NKOHDCHDOFEOOALJIGDGGPAM",
    };

    const response = await axios.post(
      "https://api.easysendsms.app/bulksms",
      payload,
      { headers }
    );
    console.log("SMS sent successfully:", response.data);
    req.session.smsCode = smsCode;
    next();
  } catch (error) {
    console.error(error);
    errorHandler(error, res);
  }
};

module.exports = sendSMS;

function generateSMSCode() {
  let min = 100000;
  let max = 999999;
  return Math.floor(min + Math.random() * (max - min + 1));
}

// try {

//   const response = await axios.post(
//     process.env.EASY_SEND_SMS_API_URL,
//     {
//       username: process.env.EASY_SEND_SMS_USERNAME,
//       password: process.env.EASY_SEND_SMS_PASSWORD,
//       to: phone,
//       from: process.env.EASY_SEND_SMS_SENDER_ID,
//       text: smsText(smsCode),
//       type: "0",
//     },
//     {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     }
//   );
//   console.log("SMS sent successfully:", response.data);
//   req.smsCode = smsCode;
//   next();
// } catch (error) {
//   errorHandler(error, res);
// }
