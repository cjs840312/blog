import express from 'express';
import bodyParser from 'body-parser';

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
