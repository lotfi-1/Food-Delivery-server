/** @format */
const express = require("express");
const app = express();
const admin = require("./routers/admin/admin");
const login = require("./routers/sign/login");
const register = require("./routers/sign/register");
const forgetPassword = require("./routers/password/forgetPassword");
const protected = require("./routers/sign/protected");
const home = require('./routers/App/home');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());
app.use("/admin", admin);
app.use("/register", register);
app.use("/login", login);
app.use("/forget-password", forgetPassword);
app.use("/protected", protected);
app.use('/home',home);


app.listen(8000);

// let offset = 0;
// const { getData } = require("./config/connect");
// const test = async () => {
//   try {
//     const result = await getData(
//       `select f.*, r.sum_rating / r.num_rating as rating
//         from food as f 
//         join (select food_id,sum(rating) as sum_rating  , count(rating) as num_rating
//               from food_rating
//               group by food_id
//             ) as r on f.id = r.food_id
//         order by rating desc
//         limit 15
//         offset ?`,
//       [offset]
//     );
//     if (result.length > 0) {
//       console.log(result, offset);
//       offset += 10;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// test();


