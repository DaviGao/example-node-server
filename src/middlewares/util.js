import Validator from 'validatorjs';
import req from '../utils/req';

function validator(data, rules) {
  const validation = new Validator(data, rules);
  if (validation.fails()) {
    const errors = validation.errors.all();
    let results = [];
    Object.values(errors).forEach(arr => {
      results = [...results, ...arr];
    });
    return {
      err: true,
      errmsg: results.join(' '),
    };
  }
  return {
    errmsg: false,
  };
}

const util = async function(ctx, next) {
  ctx.util = {
    req,
    validator,
  };
  return next();
};

export default util;
