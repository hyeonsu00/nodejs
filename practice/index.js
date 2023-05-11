const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');

// 서버 시작
app.listen(3000, () => {
    console.log('서버가 시작되었습니다.');
  });

//------------------파일 업로드 구간--------------------

// 파일 업로드를 위한 multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// 업로드된 파일을 처리하는 라우터
app.post('/upload', upload.single('userfile'), (req, res) => {
  res.send('파일이 업로드되었습니다.');
});

// 업로드 페이지를 렌더링하는 라우터
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'upload.html'));
});

const mysql = require('mysql');
const fs = require('fs');

// // inputFile.txt 파일 읽어들이기
// fs.readFile('uploads/inputFile.txt', 'utf8', function(err, data) {
//   if (err) throw err;
//     const ffilter = data.trim().trim('\n').split('\t').filter(num => !isNaN(num));
//     const sfilter = ffilter.filter(element => element !=='\n\n');
//     console.log(sfilter);
// });

// MySQL connection 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'wlsyddlwhswkf1@',
  database: 'my_db'
});

const fileContent = fs.readFileSync('uploads/inputFile.txt','utf-8');
const frows = fileContent.trim().trim('\n').split('\t').filter(num => !isNaN(num));
const srows = frows.filter(element => element !== '\n\n');
console.log(srows);


//MySQL DB 연결
connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL server~');

    const rows = [];
    const numColumns = 5;
    for(let i = 0; i<srows.length; i += numColumns){
      const row = srows.slice(i, i + numColumns);
      rows.push(row);
    }
  connection.query('delete from table_name', [rows]);
    //삽입 쿼리 생성
const insertQuery = 'INSERT INTO table_name (task1, task2, task3, task4, task5) VALUES ?';
    //데이터베이스에 데이터 삽입
    connection.query(insertQuery, [rows], (err, result, fields) =>{
      if(err) throw err;
      console.log(`Inserted ${result.affectedRows} rows.`);
      //연결 종료
      connection.end();
    })

})



