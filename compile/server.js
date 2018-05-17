var webpack = require('webpack')
var compiler = webpack(require('./webpack.config.js'))
var express = require('express')
var path = require('path')
var app = express();

require('./livereload.js')
app.use(express.static(path.join(__dirname, '../output')))
app.use(require("webpack-dev-middleware")(compiler, {
	publicPath: '/',
}));
app.use(require("webpack-hot-middleware")(compiler))
var config = require('./getConfig')()
app.listen(config.serverPort)



var bodyParser = require('body-parser');
// var multer = require('multer');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer({dest:'./'})); // for parsing multipart/form-data
app.all('/upload',function(req,res, next){
  // 设置接受可跨域请求
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers","access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,x-requested-with")
  console.log('----------------server 1')
  console.log(req.body)
  // ie8 测试相应数据只能为字符串,否则ie自动将响应值作为下载 (待优化转换)
  if(req.hostname != '127.0.0.1'){
      console.log('ie测试机')
      res.send('{\"status\":\"success\",\"data\":{\"port\":\"50044\",\"type\":\"all\"}}')
      return false
  }else{
      next()
  }
})
app.post('/upload',function(req,res){
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
      res.send({
          status:'success',
          data:{
              id:'11111'
          }
      })
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
