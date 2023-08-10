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

// const { getData } = require("./config/connect");
// const test = async () => {
//   try {
//     const result = {
//       name: "lotfi hallas",
//       phone: "3564564564",
//       password: "fdgkdg564",
//     };
//     const customer = {};
//     for (let key in result) {
//       console.log(key);
//       if (key !== "password") customer[key] = result[key];
//     }
//     console.log(customer);
//   } catch (error) {
//     console.log(error);
//   }
// };

// test();

app.listen(8000);
