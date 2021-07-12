var Koa = require('koa')
const router = require('koa-router')()

var app = new Koa()
router.get('/', function(ctx, next){
  ctx.body = '你好，koa server send data';
})
router.get('/user', function(ctx, next){
  ctx.body = 'user page coming';
})

app.use(router.routes())

app.listen(3000)