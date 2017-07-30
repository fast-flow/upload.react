var path = require('path')
var express = require('express')
var open = require("open")
var iPackage = require('../package.json')
var hashToPort = require('hash-to-port')
var serverPort = hashToPort(iPackage.name + 'fast-flow/react:static-server')
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();
app.use(express.static(__dirname + '/../output'))
app.use(require('./connect-redirect.js'))
console.log(__dirname + '/../output')
app.listen(serverPort, function(err) {
  if (err) {
    return console.error(err);
  }
  var url = 'http://localhost:' + serverPort
  open(url)
  console.log('Static server listening at ' + url);
})

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer({dest:'./'})); // for parsing multipart/form-data

app.all('/upload',function(req,res){
    // 设置接受可跨域请求
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,x-requested-with")
    console.log('static-server')
    console.log(req.query.status)
      console.log(req.body)

  var status = req.query.status || ''
  switch(status){
    case 'error':
      res.send({
        status:'error',
        msg:'error detail msg'
      })
    break
    case '500':
      res.status(500);
      res.send({
        status:'500',
      })
    break
    case 'success':
      res.send("{status:'success',data:{id:'2222222'}}")
    break
    case '307':
      res.status(307);
      res.send({
        status:'307',
      })
    default:
      console.log('not find \'status\' in config/server.js')
      res.end();
  }
})
