/** @format */

const express = require("express");
const { getData } = require("../../config/connect");
const { comparePasswords } = require("../../utils/comparePassword");
const jwt = require("jsonwebtoken");
const errorHandler = require("../../utils/errorHandler");
const router = express.Router();

router.get("/dashboard", async (req, res) => {
  try{

  } catch(error){
    errorHandler(error);
  }
  res.status(200).json({message : 'data'})
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    await getData("select email,password from Admin where email = ? ", [
      email,
    ]).then(async (result) => {
      if (result.length === 1) {
        const hashPassword = result[0].password;
        const match = await comparePasswords(password, hashPassword, res);
        if (match) {
          const token = jwt.sign({ admin: email }, process.env.SECRET_KEY, {
            expiresIn: "3h",
          });
          res.status(200).json({ token });
        }
      } else throw new Error("invalid email or password", { statusCode: 401 });
    });
  } catch (error) {
    errorHandler(error, res);
  }
});

module.exports = router;
