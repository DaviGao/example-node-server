import devConf from './dev';
import proConf from './pro';
import staticConf from './static';

const isProduction = process.env.NODE_ENV === 'production';

const configs = isProduction ? proConf : devConf;

export { configs, staticConf, isProduction };
