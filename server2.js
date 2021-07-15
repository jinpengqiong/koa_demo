var Koa = require('koa');
const router = require('koa-router')();
const path = require('path');
const session = require('koa-session');
const render = require('koa-art-template');
const bodyParser = require('koa-bodyparser');
const _MongDB = require('./db/db')


var app = new Koa();
app.keys = ['some secret hurr'];

// * koa-art-template
render(app, {
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production',
});

app.use(bodyParser());

// * koa-session
app.use(session(app));

app.use(async (ctx, next) => {
  console.log(new Date());
  // * koa-session actions
  // console.log(`ctx.session`, ctx.session)
  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  console.log(`'views'`, n + ' views')
  // ctx.body = n + ' views';
  await next();
});

router.get('/', async (ctx, next) => {
  const mongoDBInstance = new _MongDB();
  const data = await mongoDBInstance.find('king', {}).then(async (data) => {
    console.log(`JSON.stringify(data)`, JSON.stringify(data));
    ctx.state.userInfo = data;
    return data
  });
  await ctx.render('index.html', {
    list: data,
  });
});

router.get('/user/:id', async (ctx, next) => {
  // * 设置中文cookies
  ctx.body = `user id is ${ctx.params.id}, userinfo : ${Buffer.alloc(6, ctx.cookies.get('userInfo'), 'base64').toString()}`;
});
router.get('/login', async (ctx, next) => {
  ctx.body = `logon page`;
});
router.post('/form_submit', async (ctx, next) => {
  ctx.body = ctx.request.body;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
