const express = require('express');
app = express();
const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'one.html'));
  });

app.listen(3000, () =>{
    console.log('서버 시작');
});