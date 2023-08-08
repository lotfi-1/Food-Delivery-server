/** @format */

const bcrypt = require("bcrypt");
const errorHandler = require("./errorHandler");
async function comparePasswords(plainTextPassword, hashedPassword, res) {
  try {
    const isMatch = await bcrypt.compare(plainTextPassword, hashedPassword);
    if (isMatch) {
      return true;
    } else {
      throw new Error('Invalid email or password', {statusCode : 401})
    }
  } catch (err) {
    errorHandler(err, res);
  }
}
module.exports = { comparePasswords };
