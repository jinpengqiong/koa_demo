const router = require('koa-router')();

router.get('/', async (ctx, next) => {
  ctx.body = 'This is a admin page'
});
router.get('/user', async (ctx, next) => {
  ctx.body = 'This is a admin page/ user'
});
router.get('/settings', async (ctx, next) => {
  ctx.body = 'This is a admin page/settings';
});

module.exports = router.routes();