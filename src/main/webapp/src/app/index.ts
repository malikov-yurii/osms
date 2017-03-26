import * as services from './services/index';
export { App } from './app';

const mapValuesToArray = (obj) => Object.keys(obj).map(key => obj[key]);

export const providers = [
  ...mapValuesToArray(services)
];