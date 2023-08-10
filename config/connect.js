/** @format */

const mysql = require("mysql2");
require("dotenv").config();


const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "LOTfi2002",
  database: "restaurant_delivery_management",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// const pool = mysql.createPool({
//     host: 'bsrjydpg3y1sr0rmuel8-mysql.services.clever-cloud.com',
//     user: 'uoretlpuvo9fqneg',
//     password: 'gGrdmgReEs4koJZHS0Ll',
//     database: 'bsrjydpg3y1sr0rmuel8',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// })

const getData = async (query, queryParams) => {
  try {
    const connection = await new Promise((resolve, reject) => {
      pool.getConnection((error, connection) => {
        if (error) {
          console.error("Error getting connection from pool: ", error);
          reject(new Error("Internal Server Error"));
        } else {
          resolve(connection);
        }
      });
    });

    const results = await new Promise((resolve, reject) => {
      connection.query(query, queryParams, (error, results) => {
        if (error) {
          console.error("Error executing query: ", error);
          reject(new Error("Internal Server Error"));
        } else {
          connection.release(); // Release the connection back to the pool
          resolve(results);
        }
      });
    });

    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  pool,
  getData,
};
