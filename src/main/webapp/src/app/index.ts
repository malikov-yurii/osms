import * as services from './services/index';
import { Store } from './store';
export { App } from './app';
export { routes } from './routes';
export { KeysPipe } from './pipes';

const mapValuesToArray = (obj) => Object.keys(obj).map(key => obj[key]);

export const providers = [
  Store,
  ...mapValuesToArray(services)
];
