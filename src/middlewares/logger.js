import { formatLog } from '../utils';

const logger = async function(ctx, next) {
  const start = new Date();
  const { res, method = '', path = '' } = ctx;
  let queryStr = '{}';
  let field = 'query';
  if (method === 'GET') {
    const { query = {} } = ctx;
    queryStr = JSON.stringify(query);
  }

  if (method === 'POST') {
    const { request = {} } = ctx;
    const body = request.body || {};
    queryStr = JSON.stringify(body);
    field = 'body';
  }
  // design log format
  const options = [
    { k: 'type', v: 'api' },
    { k: 'api', v: 'req' },
    { k: 'url', v: path, color: 'green' },
    { k: 'method', v: method },
    { k: field, v: queryStr },
  ];
  const log = formatLog(options);
  console.log(log);

  await next();

  res.on('finish', () => {
    const delta = new Date() - start;
    // const deltaStr = delta < 1000 ? `${delta}ms` : `${delta / 1000}s`
    const { status = 0, message = '', body = '', length = '' } = ctx;
    // design log format
    const options = [
      { k: 'type', v: 'api' },
      { k: 'api', v: 'res' },
      { k: 'url', v: path, color: 'greenBright' },
      { k: 'method', v: method },
      { k: 'status', v: status },
      { k: 'message', v: message },
      { k: 'data', v: body.slice(0, 200) },
      { k: 'time', v: `${delta}ms` },
      { k: 'length', v: `${length}b` },
    ];
    const log = formatLog(options);
    console.log(log);
  });
};

export default logger;
