const router = require('koa-router')();

router.get('/', async (ctx, next) => {
  ctx.body = 'This is a api page';
});
router.get('/getUserData', async (ctx, next) => {
  ctx.body = [1,2,3]
});
router.post('/updateUserData', async (ctx, next) => {
  ctx.body = [3,4,5];
});

module.exports = router.routes();
