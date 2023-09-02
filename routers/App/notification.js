/** @format */

const express = require("express");
const router = express.Router();
const { getData } = require("../../config/connect");
const errorHandler = require("../../utils/errorHandler");

router.get("/:customer_id", async (req, res) => {
  try {
    const { customer_id } = req.params;
    const result = await getData(
      `select * from notification where notification.customer_id = ? and notification.is_read = false`,
      [customer_id]
    );
    res.status(200).json({ notification: result });
  } catch (error) {
    errorHandler(error, res);
  }
});

router.post("/:customer_id",async (req, res) => {
  try {
    const { customer_id } = req.params;
    const { type, description, url } = req.body;

    await getData('insert into notification ')
  } catch (error) {
    errorHandler(error, res);
  }
});
