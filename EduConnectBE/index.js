const mysql = require('mysql');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express()
const port = 3000
app.use(express.json())
const ApiV1 = require("./routes");

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '123456789',
//   database: 'educonnect'
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected to MySQL database.');
// });

// connection.query('SELECT * FROM user', (error, results, fields) => {
//     if (error) {
//       console.error('Error executing query:', error);
//       return;
//     }
//     console.log('Query results:', results);
//   });



app.use("/v1", ApiV1);
app.listen(port, () =>
  console.log(
    `Example app listening on port ${port}`
  )
);

app.post('/login', (req, res) => {
  try {
    const query = 'SELECT * FROM user WHERE username = ? and password = ?';
    const username = req.body?.username
    const password = req.body?.password
    db.connectionDB.query(query, [username, password], (error, results, fields) => {
      if (error) {
        res.status(404).json({
          status: 404,
          data: {},
          message: error
        })
        return;
      }
      else {
        const accessToken = jwt.sign(
          {
            userId: results[0]?.userId,
            role: results[0]?.role
          },
          "test",
          {expiresIn: "30s"}
        )
        res.status(200).json({
          status: 200,
          data: {results, accessToken},
          message: "get value success"
        })
      }
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 500,
      data: {},
      message: error
    })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
