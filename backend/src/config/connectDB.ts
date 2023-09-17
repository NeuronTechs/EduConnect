import mysql from "mysql";
import env from "./environment";

export default {
  connectionDB: mysql.createConnection({
    host: env.HOST,
    user: env.USER,
    password: env.PASSWORD,
    database: env.DATABASE,
  }),
  // mysql.createConnection({
  //     host: "educonnect-db-mysql-01.mysql.database.azure.com",
  //     user: "admin_educonnect_db_msql01",
  //     password: "Educonnnect13579@",
  //     database: "educonnectdb",
  //     port: 3306
  // })
};
// var conn = mysql.createConnection({
//     host: "educonnect-db-mysql-01.mysql.database.azure.com",
//     user: "admin_educonnect_db_msql01", password: "{your_password}",
//     database: "{your_database}", port: 3306,
// ssl: true,
//     ssl: { ca: fs.readFileSync("{ca-cert filename}") }
// });
