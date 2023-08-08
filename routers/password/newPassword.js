const bcrypt = require('bcrypt');
const { getData } = require("../../config/connect");
const errorHandler = require('../../utils/errorHandler');

const router = express.Router();

router.post('/new-password', async (req, res) => {
    try {
        const { phone, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        if (!hashPassword) {
            throw new Error('Error occurred during register', { statusCode: 401 })
        }
        await getData(`insert into customer (password) values (?) where phone = ? `, [hashPassword, phone]);
        const token = jwt.sign({ phone: userPhone }, secretKey, { expiresIn: '24h' });
        res.status(200).json({ token });
    } catch (error) {
        errorHandler(error, res)
    }
});

module.exports = router; 