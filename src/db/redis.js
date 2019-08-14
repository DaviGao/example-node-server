import redis from 'redis';
import bluebird from 'bluebird';
import { configs } from '../config';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const { redis: redisConfig } = configs;
const { host, port } = redisConfig;

const client = redis.createClient({
  host,
  port,
  retry_strategy: options => {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      console.log(`type=redis status=fail errmsg=refused`);
    }
    if (options.total_retry_time > 10000) {
      console.log(`type=redis status=fail errmsg=exhausted`);
    }
    if (options.attempt > 10) {
      console.log(`type=redis status=fail errmsg=attempt-${options.attempt}`);
    }
    return Math.min(options.attempt * 50, 3000);
  },
});

client.on('error', err => {
  console.log(`type=redis error=${err.toString()}`);
});

export default client;
