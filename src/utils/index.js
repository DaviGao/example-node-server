import chalk from 'chalk';

// success response of json
function outputJSON({ ctx, data, errno = 0, errmsg = 'success' }) {
  ctx.set('Content-type', 'application/json; charset=utf-8');
  let res = {
    errno,
    errmsg,
    data,
  };
  ctx.body = JSON.stringify(res);
}
// fail response of json
function outputError({ ctx, data, errno = 1, errmsg = '' }) {
  ctx.set('Content-type', 'application/json; charset=utf-8');
  let res = {
    errno,
    errmsg,
    data,
  };
  ctx.body = JSON.stringify(res);
}

/**
 * string/json transfer
 * @param  {object} origin
 * @param  {enum: json/string} target
 */
function parseStrOrJson(origin, target) {
  let result;
  try {
    result = target === 'string' ? JSON.stringify(origin) : JSON.parse(origin);
  } catch (e) {
    result = false;
  }
  return result;
}

/**
 * logs format key=value
 * @param  {array: [{k, v}]} options
 */
function formatLog(options) {
  return options
    .map(i => {
      const { k, v, color } = i;
      const str = `${k}=${v}`;
      return color ? chalk[color](str) : str;
    })
    .join(' ');
}

/**
 * check type
 * @param {any} data
 */
function types(data) {
  const type = Object.prototype.toString.call(data).toLowerCase();
  const typeMap = {
    '[object object]': 'object',
    '[object array]': 'array',
    '[object string]': 'string',
    '[object number]': 'number',
    '[object null]': 'null',
    '[object undefined]': 'undefined',
    '[object boolean]': 'boolean',
    '[object function]': 'function',
  };
  return typeMap[type];
}

/**
 * print req logs
 * @param  {object} response
 */
function loggerResponse(response) {
  const {
    status,
    data,
    statusText,
    config: { method, url },
  } = response;
  const resStr = parseStrOrJson(data, 'string') || '';
  const options = [
    { k: 'type', v: 'api' },
    { k: 'api', v: 'out-res' },
    { k: 'url', v: url, color: 'gray' },
    { k: 'method', v: method },
    { k: 'status', v: status },
    { k: 'statusText', v: statusText },
    { k: 'data', v: resStr.slice(0, 200) },
  ];
  const log = formatLog(options);
  console.log(log);
}

export { outputJSON, outputError, parseStrOrJson, loggerResponse, formatLog, types };
