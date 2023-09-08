import express from 'express'
import ApiV1 from './routes'
const app = express()
const port = 3000
app.use(express.json())

app.use("/v1", ApiV1);
app.listen(port, () =>
  console.log(
    `Example app listening on port ${port}`
  )
);