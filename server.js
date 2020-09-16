const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/customers', (req, res) => {
    res.send([
        {
          'id': 1,
          'image': 'http://placeimg.com/64/64/1',
          'name': '홍길동',
          'birthday': '951003',
          'gender': '남자',
          'job': '소방관'
        },
        {
          'id': 2,
          'image': 'http://placeimg.com/64/64/2',
          'name': '고길동',
          'birthday': '960528',
          'gender': '남자',
          'job': '관리자'
        },
        {
          'id': 3,
          'image': 'http://placeimg.com/64/64/3',
          'name': '그레이트',
          'birthday': '909090',
          'gender': '남자',
          'job': '장로'
        },
      ])
})

app.listen(port, () => console.log(`Listening on port ${port}`));