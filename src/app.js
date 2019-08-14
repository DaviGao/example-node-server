import Koa from 'koa';
import cors from 'kcors';
import bodyParser from 'koa-bodyparser';
import chalk from 'chalk';
import logger from './middlewares/logger';
import util from './middlewares/util';
import router from './routers';

const app = new Koa();

app.use(
  cors({
    // pass header: Access-Control-Allow-Credentials
    credentials: true,
  }),
);

app.proxy = true;

// proxy post data to ctx.request.body
app.use(bodyParser());

app.use(logger);
app.use(util);

app.use(router.middleware());

export default app;

app.listen(8006, () => {
  console.log(chalk.cyan('server started: localhost:8006'));
});
