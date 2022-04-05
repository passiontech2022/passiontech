const { Client } = require('pg');
const { Client } = require('pg');
var express = require('express');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const client = new Client({
  connectionString: "postgres://hmjmcdxyeuoocv:e92d93a30f2ab38b6938ba09349b0fd6364ec7dc45512bb8d2a75ad25fb83b38@ec2-34-192-83-52.compute-1.amazonaws.com:5432/d5nqg1sipfcc0u",
  ssl: true,
});

client.connect();	

var myapp = express();
const path = require('path');
const router = express.Router();

myapp.use(function(req, res, next){ 
req.headers['content-type'] = "application/json"; 
next();
});

myapp.get('/', function(req, res) {
   res.sendFile( __dirname);
   res.sendFile(path.join(__dirname + '/church/UI/home.html'));
});
const portr = process.env.PORT || 3000;

myapp.listen(portr);