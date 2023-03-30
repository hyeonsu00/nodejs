const http = require('http');

const hostname = 'localhost';  //외부 서버가 아닌 현재 사용중인 자기 자신의 주소를 의미미
//const hostname = '127.0.0.1'; //loop back : 외부로 나가지 않고 자기 자신에게 되돌아옴
const port = 3000;  
const server = http.createServer((req, res)=>{ //서버를 만들고 변수에 저장. req: 요청, res: 응답
    res.statusCode = 200;   //ok라는 뜻
    res.setHeader('Content-type', 'text/plain');//content-Type을 text타입으로 하겠다 : 암호화 안 한다는 뜻
    res.end('Hello World. OMG');    //이 글자를 담아 응답을 해줌
});

server.listen(port, hostname,()=>{// listen, port: 어떤 포트? hostname: 어떤 주소
    console.log(`Server runnint at http://${hostname}:${port}/`);  // http://hostname:port server가 돌고있다. 
});