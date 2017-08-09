import { LOCALE_ID } from '@angular/core';
import * as services from './services/index';
import { Store } from './store';

export { App } from './app';
export { routes } from './routes';
export { KeysPipe, SearchPipe } from './pipes';

const mapValuesToArray = (obj) => Object.keys(obj).map(key => obj[key]);

export const providers = [
  { provide: LOCALE_ID, useValue: "ru-RU" },
  Store,
  ...mapValuesToArray(services)
];
