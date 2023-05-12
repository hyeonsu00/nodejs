const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const mysql = require('mysql');
const fs = require('fs');

// 업로드 페이지를 렌더링하는 라우터
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'upload.html'));
});
// 서버 시작
app.listen(3000, () => {
    console.log('서버가 시작되었습니다.');
});

// MySQL connection 설정
const connection = mysql.createConnection(
  {host: 'localhost', user: 'root', password: '', database: ''}
);


// 파일 업로드를 위한 multer 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage});

// 업로드된 파일을 처리하는 라우터
//파일로 들어온 데이터 가공하고 DB에 저장
app.post('/upload', upload.single('userfile'), (req, res) => {
    // res.sendFile(path.join(__dirname, 'main.html'));
   const file = req.file;
   if(!file)
      res.send('파일 불러오셈!!');
    res.send('업로드 됨!!');
   
    
    const fileContent = fs.readFileSync('uploads/inputFile.txt', 'utf-8');
    const frows = fileContent
        .trim()
        .trim('\n')
        .split('\t')
        .filter(num => !isNaN(num))
        .filter(element => element !== '\n\n');


    const rows = [];
    const numColumns = 5;
    for (let i = 0; i < frows.length; i += numColumns) {
        const row = frows.slice(i, i + numColumns);
        rows.push(row);
    }

    // MySQL DB 연결
    connection.connect((err) => {
      if (err) 
          throw err;
      console.log('Connected to MySQL server~');

  });

    // 전에 저장된 데이터들 삭제
    connection.query('DELETE FROM table_name', [rows]);


    // 삽입 쿼리 생성
    connection.query('INSERT INTO table_name (task1, task2, task3, task4, task5) VALUES ?',[rows], (err) => {
      if (err) 
            throw err;
        console.log(`Inserted ${rows.length} rows.`);
        console.log(rows[0]);

    });
  
    connection.end();

    fs.unlink('uploads/inputFile.txt', err => {
      if (err) throw err;
    
      console.log('File is deleted.');
    });
});
//이 부분까지 inputFile.txt파일을 넣고 MySQL DB에 넣기 위한 과정!!!














