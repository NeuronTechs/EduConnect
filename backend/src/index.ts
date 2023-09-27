import express from "express";
import ApiV1 from "./routes";
const app = express();
const cors = require("cors");
const port = 3000;
app.use(express.json());

app.use(
  cors({
    origin: `http://localhost:3001`,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use("/v1", ApiV1);
app.listen(port, () => console.log(`Example app listening on port ${port}`));
