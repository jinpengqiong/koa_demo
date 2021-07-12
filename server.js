var Koa = require('koa')
const router = require('koa-router')()

var app = new Koa()

router
  .get('/', function(ctx, next){
  ctx.body = '你好，koa server send data';
  })

router.get('/user/:id', async (ctx, next) => {
  ctx.body = `user id is ${ctx.params.id}`;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000)