var Koa = require('koa')
const router = require('koa-router')()

var app = new Koa()
app.use(async(ctx,next)=>{
  console.log(new Date())
  await next()
})

router
  .get('/', function(ctx, next){
  ctx.body = '你好，koa server send data';
  })

router.get('/user/:id', async (ctx, next) => {
  ctx.body = `user id is ${ctx.params.id}`;
});
router.get('/login', async (ctx, next) => {
  ctx.body = `logon page`;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000)