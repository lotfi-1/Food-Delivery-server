/** @format */

const express = require("express");
const { getData } = require("../../config/connect");
const { comparePasswords } = require("../../utils/comparePassword");
const errorHandler = require("../../utils/errorHandler");
const { relation } = require("../../config/relation");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { phone, oldPassword } = req.body;
    await getData("select password from customer where phone = ? ", [
      phone,
    ]).then(async (result) => {
      if (result.length === 1) {
        const { password } = result[0];
        const compare = await comparePasswords(oldPassword, password);
        if (compare) {
          res.json(200).json({ message: "password is valid" });
        }
      } else throw new Error("invalid Phone number", { statusCode: 401 });
    });
  } catch (error) {
    errorHandler(error,res);
  }
});
