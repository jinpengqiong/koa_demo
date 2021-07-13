var Koa = require('koa')
const router = require('koa-router')()
const views = require('koa-views')
const bodyParser = require('koa-bodyparser');

var app = new Koa()
// * koa-views
const render = views('views', { extension: 'ejs' });
app.use(render);
app.use(bodyParser())

app.use(async(ctx,next)=>{
  console.log(new Date())
  await next()
})

app.use(async(ctx, next) => {
  ctx.state.userInfo = {
    userName:'Kim',
    age: 30
  }
  await next();
})

router
  .get('/', async(ctx, next) => {
    const content = '<h2>this is a html variable</h2>'
    await ctx.render('index.ejs', {
      list: ['ejs Modules', 'Micheal Jordan', 'Micheal Jackson'],
      content
    });
  })

router.get('/user/:id', async (ctx, next) => {
  ctx.body = `user id is ${ctx.params.id}`;
});
router.get('/login', async (ctx, next) => {
  ctx.body = `logon page`;
});
router.post('/form_submit', async (ctx, next) => {
  ctx.body = ctx.request.body
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000)