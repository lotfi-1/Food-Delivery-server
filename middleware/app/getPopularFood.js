/** @format */

const { getData } = require("../../config/connect");
const errorHandler = require("../../utils/errorHandler");

let offset = 0;
const getPopularFood = async (req, res, next) => {
  try {
    const result = await getData(
      `select f.*, r.sum_rating / r.num_rating as rating
        from food as f 
        join (select food_id,sum(rating) as sum_rating  , count(rating) as num_rating
              from food_rating
              group by food_id
            ) as r on f.id = r.food_id
        order by rating desc
        limit 15
        offset ?`,
      [offset]
    );
    if (result.length > 0) {
      req.popularFood = result;
      offset += 10;
    }
    next();
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = getPopularFood;
