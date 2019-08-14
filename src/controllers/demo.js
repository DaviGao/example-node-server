import { outputJSON } from '../utils';
import { isProduction } from '../config';

export default async function(ctx) {
  outputJSON({ ctx, data: { tip: 'demo', isProduction } });
}
