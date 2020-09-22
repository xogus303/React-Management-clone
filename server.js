const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  post: conf.port,
  database: conf.database
});

connection.connect();

const multer = require('multer'); // 파일처리 라이브러리
const upload = multer({ dest: './upload' }); // 루트의 업로드 폴더

app.get('/api/customers', (req, res) => {
    connection.query(
      "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
      (err, rows, fields) => {
        res.send(rows);
      }
    )
})

app.use('/image', express.static('./upload')); // 'image'란 이름의 경로로 업로드 폴더와 맵핑,

app.post('/api/customers', upload.single('image'), (req, res) =>  {
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name
  let birthday = req.body.birthday
  let gender = req.body.gender
  let job = req.body.job
  let params = [image, name, birthday, gender, job];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows)
      console.log('err', err);
      console.log('rows', rows);
    })
})

app.delete('/api/customers/:id', (req, res) => {
  let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
  let params = [req.params.id];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows)
    }
  )
})



app.listen(port, () => console.log(`Listening on port ${port}`));