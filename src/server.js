import express from 'express';
import bodyParser from 'body-parser';
//rjbz5hZMZf1n*D1F

var mariasql=require('mariasql')

var sql = new mariasql({
  host: 'sql12.freemysqlhosting.net',
  user: 'sql12180051',
  password: 'SKNTLnDWqa',
  db: 'sql12180051'
});

const server = express();
server.use(bodyParser.json());

server.listen(3000, function () {
  console.log('listening on port 3000...');
});

server.get('/', (req, res) => {
  res.sendFile(__dirname+"/HomePage.html");
});

server.get('/bundle.js', (req, res) => {
  res.sendFile(__dirname+"/bundle.js");
});

server.post('/postArticle', (req, res) => {
  console.log(req.body)
  let q='insert into blog values(:title,:content,NOW())'
  sql.query(q, {"title": req.body.title, "content": req.body.content},function (err,result){
    if(err) console.log(err)
  })
});

server.get('/getArticle', (req, res) => {
    let q='select * from blog order by time desc limit 5'
    sql.query(q, function (err,result){
    res.send(result)
  })
});