var Koa = require('koa')
const router = require('koa-router')()
const path = require('path')
// const views = require('koa-views')
const render = require('koa-art-template');
const bodyParser = require('koa-bodyparser');
// const serve = require('koa-static');

var app = new Koa()
// * koa-views
// const render = views('views', { extension: 'ejs' });
// app.use(render);

// * koa-art-template
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production',
});


app.use(bodyParser())

// app.use(serve(__dirname + '/dist'));

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
    // await ctx.render('index.ejs', {
    //   list: ['ejs Modules', 'Micheal Jordan', 'Micheal Jackson'],
    //   content
    // });
    const userInfo = new Buffer('金鹏').toString('base64')
    ctx.cookies.set('userInfo', userInfo, {
      maxAge: 60 * 1000 * 60 * 24,
      httpOnly: true,
    });
    await ctx.render('index.html', {
      list: ['ejs Modules', 'Micheal Jordan', 'Micheal Jackson'],
      content,
    });
  })

router.get('/user/:id', async (ctx, next) => {
  // * 设置中文cookies
  ctx.body = `user id is ${ctx.params.id}, userinfo : ${new Buffer(ctx.cookies.get('userInfo'), 'base64').toString()}`;
});
router.get('/login', async (ctx, next) => {
  ctx.body = `logon page`;
});
router.post('/form_submit', async (ctx, next) => {
  ctx.body = ctx.request.body
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000)