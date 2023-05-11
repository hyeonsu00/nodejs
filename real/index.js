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

const fs = require('fs');
const mysql = require('mysql');

//MySQL 연결 정보
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'wlsyddlwhswkf1@',
  database: 'my_db'
});

//inputFile.txt파일 읽기
fs.readFile('inputFile.txt', 'utf8', function(err, data){
  if (err) throw err;
    
})

