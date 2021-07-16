var Koa = require('koa');
const router = require('koa-router')();
const path = require('path');
const session = require('koa-session');
const render = require('koa-art-template');
const bodyParser = require('koa-bodyparser');
const svgCaptcha = require('svg-captcha');
const mongoDBInstance = require('./db/db');
const admin = require('./routes/admin')
const API = require('./routes/api')


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
  console.time()
  const data = await mongoDBInstance.find('king', {}).then((data) => {
    console.timeEnd();
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

router.get('/checkCode', async (ctx, next) => {
  var captcha = svgCaptcha.create({
    size: 6,
    fontSize: 50,
    width: 100,
    height: 40,
    background: 'lightGreen'
  });
  ctx.body = captcha.data
});

//* redirect to sub-routes
router.use('/admin', admin);
router.use('/api', API);

router.get('/deleteUser', async (ctx, next) => {
  await mongoDBInstance.delete('king', { title: 'MongoDB 教程11111111111' }).then((isOk) => {
    if (isOk) {
      ctx.body = `data removed!`;
    }
  });
});
router.get('/login', async (ctx, next) => {
  await mongoDBInstance.update('king', { by: '菜鸟教程' }, { title: 'MongoDB 教程' }, false).then((isOk) => {
    if (isOk) {
      ctx.body = `data updated!`;
    }
  });
});
router.get('/form', async (ctx, next) => {
  console.time();
await mongoDBInstance
    .insert('king', {
      title: 'MongoDB 教程',
      description: 'MongoDB 是一个 Nosql 数据库',
      by: '菜鸟教程',
      url: 'http://www.runoob.com',
      tags: ['mongodb', 'database', 'NoSQL'],
      likes: Math.random(),
      time: new Date().toISOString()
    })
    .then((isOk) => {
      if (isOk) {
        ctx.body = `data inserted!`;
      }
    });
  console.timeEnd();
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
