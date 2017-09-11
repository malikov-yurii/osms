export { Order } from './order.model';
export { Product } from './product.model';
export { AutocompleteItem } from './autocomplete-item.model';
export var STATIC_DATA = {
    infoBlocks: {
        status: ['SHP', 'WFP', 'OK', 'NEW', 'NOT'],
        paymentType: ['PB', 'SV', 'NP']
    },
    fieldsToAutocomplete: ['customerLastName', 'customerPhoneNumber', 'destionationCity', 'name'],
    keycodesNotToAutocomplete: [9, 13, 16, 17, 18, 20],
    sessionTime: 235 * 60 * 1000,
    ordersPath: 'order',
    orderItemsPath: 'orderItems'
};
