/** @format */

const express = require("express");
const { authenticateToken } = require("../../middleware/authenticateToken");
const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
  res.status(200).json({ customer: req.session.customer });
});

module.exports = router;
