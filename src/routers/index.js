import Router from 'koa-better-router';
import demo from '../controllers/demo';

const router = Router().loadMethods();

// test demo
router.get('/demo', demo);

export default router;
