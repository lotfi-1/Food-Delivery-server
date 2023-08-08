const express = require("express");
const errorHandler = require('../../utils/errorHandler');
const sendSMS = require('../../middleware/sendSms');
const router = express.Router();


router.post('/', sendSMS, (req, res) => {
    try {
        const { userEnteredCode } = req.body;
        if (userEnteredCode === req.smsCode)
            res.status(200).json({ message: 'your code is valid' });
        else
            throw new Error('invalid code', { statusCode: 401 })
    } catch (error) {
        errorHandler(error, res)
    }
})

module.exports = router;