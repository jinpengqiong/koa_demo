var Koa = require('koa')
const router = require('koa-router')()
const views = require('koa-views')

var app = new Koa()
// * koa-views
const render = views('views', { extension: 'ejs' });
app.use(render);

app.use(async(ctx,next)=>{
  console.log(new Date())
  await next()
})

router
  .get('/', async(ctx, next) => {
    await ctx.render('index.ejs', {
      list: ['ejs Modules','Micheal Jordan','Micheal Jackson']
    });
  })

router.get('/user/:id', async (ctx, next) => {
  ctx.body = `user id is ${ctx.params.id}`;
});
router.get('/login', async (ctx, next) => {
  ctx.body = `logon page`;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000)