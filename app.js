/** @format */
const express = require("express");
const app = express();
const admin = require("./routers/admin/admin");
const login = require("./routers/sign/login");
const register = require("./routers/sign/register");
const forgetPassword = require("./routers/password/forgetPassword");
const protected = require("./routers/sign/protected");
const home = require("./routers/App/home");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET_KEY,
  })
);
app.use(cors());
app.use("/admin", admin);
app.use("/register", register);
app.use("/login", login);
app.use("/forget-password", forgetPassword);
app.use("/protected", protected);
app.use("/home", home);

// const { getData } = require("./config/connect");

// app.get('/',(req,res)=>{
//     res.download('../../Desktop/idea.md');
// })
app.listen(3000);
