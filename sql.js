// var mysql = require('mysql');
// var db = mysql.createConnection({
//
//     host:"localhost",
//     user:"root",
//     password:"mysql123",
//     database:"cms",
//     port:3306,
//
// });
//
// db.connect();
//
// module.exports = db;

// import "reflect-metadata";
// import { createConnection } from "typeorm";
// import { Photo } from "./entity/Photo";
//
// createConnection({
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "root",
//     password: "mysql123",
//     database: "cms",
//     entities: [Photo],
//     synchronize: true,
//     logging: false
// })
//     .then(connection => {
//         // 这里可以写实体操作相关的代码
//     })
//     .catch(error => console.log(error));