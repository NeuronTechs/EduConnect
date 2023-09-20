import mysql from "mysql2";
import env from "./environment";
import fs from "fs";

export default {
  connectionDB:
    // mysql.createConnection({
    //   host: env.HOST,
    //   user: env.USER,
    //   password: env.PASSWORD,
    //   database: env.DATABASE,
    // }),
    mysql.createConnection({
      host: "educonnect-db-mysql-01.mysql.database.azure.com",
      user: "admin_educonnect_db_msql01",
      password: "Educonnect13579@",
      database: "educonnectdb",
      port: 3306,
      ssl: {
        ca: fs.readFileSync(
          "./src/config/DigiCertGlobalRootCA.crt.pem..pem..pem"
        ),
      },
    }),
};
