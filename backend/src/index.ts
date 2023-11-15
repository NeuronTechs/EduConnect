import express from "express";
import ApiV1 from "./routes";
import db from "./config/connectDB";
import environment from "./config/environment";

const cors = require("cors");

db.connectionDB.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }

  console.log("Connected to the database.");
  const app = express();
  const port = 3000;
  app.use(express.json());
  app.use(
    cors({
      origin: `${environment.BASE_URL}}`,
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );
  app.use("/v1", ApiV1);
  app.listen(port, () => console.log(`Example app listening on port ${port}`));
});
