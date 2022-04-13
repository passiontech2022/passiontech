process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
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
   
   res.sendFile(path.join(__dirname + '/church/UI/home.html'));
});
myapp.use(express.static(__dirname + '/church/UI'));

myapp.post('/ministry/signup', function (req, res) {
client.connect();	

var datae = {};


var name = req.body.name;
var sex = req.body.sexx;
var age = req.body.age;
var maId = 3;	
	

client.query("SELECT id FROM users ORDER BY id DESC;", (errf, respf) => {
if (errf){
	
}else{
var newId = respf.rows[0].id + 1;	
const text = "INSERT INTO users(id,NAME,SEX,AGE) VALUES('NULL', '"+ name +"', '"+ sex +"', '"+ age +"') RETURNING id;";
client.query(text, (err, resp) => {
if (err){
datae['status'] = 404;
datae['error'] = "Error: Problem occur when signing up...";
res.send(datae);
}else{
	
datae['status'] = 200;
datae['name'] = name;
datae['message'] = "Registration was successful";



res.send(datae);
}
});
}
});


});


const portr = process.env.PORT || 3000;

myapp.listen(portr);