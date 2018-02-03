export { Order }             from './order.model';
export { Product }           from './product.model';
export { AutocompleteItem }  from './autocomplete-item.model';
export { IOrderFilter }      from './order-filter.interface';
export { IPageStream }       from './page-stream.interface';
export { IState }             from './state.interface';

export const STATIC_DATA = {
  infoBlocks: {
    status: ['SHP', 'WFP', 'OK', 'NEW', 'NOT'],
    paymentType: ['PB', 'SV', 'NP']
  },
  fieldsToAutocomplete: ['customerLastName', 'customerPhoneNumber', 'destinationCity', 'orderLineProductName'],
  serviceKeys: [9, 13, 16, 17, 18, 20, 37, 38, 39, 40], // Tab, Enter, Shift, Ctrl, Alt, Caps Lock, Arrows Left, Up, Right, Down
  sessionTime: 235 * 60 * 1000, // minutes
  ordersPath: 'order',
  orderItemsPath: 'orderLines'
};


