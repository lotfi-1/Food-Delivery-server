const { getData } = require("../config/connect");
let offset = 0;
const search = async (req, res) => {
    const { q } = req.query;
    const query = `SELECT * FROM restaurant WHERE name LIKE ? OR name LIKE ? OR name LIKE ? LIMIT 5 OFFSET ? 
    UNION SELECT * FROM food WHERE name LIKE ? OR name LIKE ? OR name LIKE ? LIMIT 5 OFFSET ?`;
    const queryParams = [`%${q}%`, offset];

    await getData(query, queryParams)
        .then((result) => {
            console.log(result);
            offset += 5;
        })
}