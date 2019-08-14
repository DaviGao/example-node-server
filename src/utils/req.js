import axios from 'axios';
import qs from 'qs';
import { staticConf } from '../config';
import { loggerResponse } from '../utils';

const { FAILURE } = staticConf.ERRNO_TYPE;

const baseOptions = {
  withCredentials: true,
  timeout: 10000,
  validateStatus: function(status) {
    return status >= 200 && status < 300;
  },
};

/**
 * req base
 * @param  {object} options
 */
async function request(options) {
  console.log(`type=api api=out-req ${JSON.stringify(options)} `);
  return axios(options)
    .then(res => {
      // print logs
      loggerResponse(res);
      return res.data;
    })
    .catch(err => {
      console.log(
        `type=api api=err url=${options.url || ''} msg=request failed ctx=req ${err.message ||
          'req error'}`,
      );
      return {
        errno: FAILURE,
        errmsg: 'something went wrong.',
      };
    });
}

export default {
  /**
   * get method
   * @param  {string} url
   * @param  {object} params
   * @param  {object} options
   */
  get({ url, params, options }) {
    return request({
      url,
      ...baseOptions,
      params,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      ...options,
    });
  },

  /**
   * post method
   * @param  {string} url
   * @param  {object} params
   * @param  {object} options
   */
  post({ url, params, options }) {
    return request({
      url,
      ...baseOptions,
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify(params),
      ...options,
    });
  },

  /**
   * postJson method
   * @param  {string} url
   * @param  {object} params
   * @param  {object} options
   */
  postJson({ url, params, options }) {
    return request({
      url,
      ...baseOptions,
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(params),
      ...options,
    });
  },
};
