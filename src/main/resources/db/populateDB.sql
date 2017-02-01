TRUNCATE TABLE products_attr, attr_values, attr, order_items, orders, customers,
products_to_categories, categories, products, user_roles, users CASCADE;

ALTER SEQUENCE products_attr_product_attr_id_seq RESTART WITH 1;
ALTER SEQUENCE attr_values_value_id_seq RESTART WITH 1;
ALTER SEQUENCE attr_attr_id_seq RESTART WITH 1;
ALTER SEQUENCE orders_id_seq RESTART WITH 1;
ALTER SEQUENCE customers_id_seq RESTART WITH 1;
ALTER SEQUENCE categories_id_seq RESTART WITH 1;
ALTER SEQUENCE products_id_seq RESTART WITH 1;
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE order_items_id_seq RESTART WITH 1;


INSERT INTO users (name, password) VALUES
  ('user', '$2a$11$bRQR2FxnBrKnr/PS0eaDUeEQzO2ZtYJllGPIkdekZ0q6rJVJrCmXm'), -- password = '1111'
  ('admin', '$2a$11$bRQR2FxnBrKnr/PS0eaDUeEQzO2ZtYJllGPIkdekZ0q6rJVJrCmXm'); -- password = '1111'

INSERT INTO user_roles (role, user_id) VALUES
  ('ROLE_USER', 1),
  ('ROLE_ADMIN', 2),
  ('ROLE_USER', 2);

INSERT INTO products (name, price, unlimited, quantity, different_prices) VALUES
  ('Shellac Manetti', 235, 1, 22, 1),
  ('Potal Nazionale', 385, 0, 44, 1),
  ('Ferrario klej rozovyj', 220, 1, 33, 1),
  ('Potal Kitaj', 145, 0, 11, 1),
  ('Divolo Bitum Vosk', 570, 0, 1, 0);

INSERT INTO attr (name) VALUES
  ('Container'),
  ('Leaves quantity');

INSERT INTO attr_values (attr_id, name) VALUES
  (1, '0.1L (plastic)'),
  (1, '0.25L (plastic)'),
  (2, '100 leaves'),
  (2, '500 leaves');

INSERT INTO products_attr (product_id, price, count, attr_value_id) VALUES
  (1, 110, 88, 1),
  (1, 235, 89, 2),
  (2, 385, 22, 3),
  (2, 1745, 23, 4),
  (3, 110, 44, 1),
  (3, 220, 45, 2),
  (4, 145, 55, 3),
  (4, 585, 56, 4);

INSERT INTO categories (name) VALUES
  ('Laki'),
  ('Klei'),
  ('Potal i zoloto');

INSERT INTO products_to_categories (product_id, category_id) VALUES
  (1, 1),
  (2, 3),
  (3, 2),
  (4, 3),
  (5, 1);

INSERT INTO customers (name, last_name, phone_number, city, nova_poshta, email) VALUES
  ('Alex', 'Drogichinskij', '0674861352', 'Ilichevsk', '3', 'drogychynsky@gmail.com'),
  ('Sergei', 'Goltvjanskij', '0938754590', 'Kiev', '31', 'goltvyanskyy@gmail.com'),
  ('Elena', 'Dunovskaya', '0984231204', 'Sumy', '7', 'katerina.tcherednichenko@yandex.ru'),
  ('WithNoOrderName', 'WithNoOrderLastName', '0980000000', 'ZeroTown', '0', 'zero@yandex.ru');

INSERT INTO orders (customer_id, customer_name, customer_last_name, customer_phone_number, customer_city, customer_nova_poshta, total_sum, user_id, payment_type, status, date_placed
) VALUES
  (2, 'Sergei', 'Goltvjanskij', '0938754590', 'Kiev', '31', 825, 2, 'PRIVAT_CARD', 'AWAITING_FOR_PAYMENT', '2016-09-15'),
  (2, 'Sergei', 'Goltvjanskij', '0938754590', 'Kiev', '31', 1285, 2, 'CASH_ON_DELIVERY', 'READY_FOR_SHIPMENT', '2016-11-17'),
  (1, 'Alex', 'Drogichinskij', '0674861352', 'Ilichevsk', '3', 725, 2, 'PRIVAT_CARD', 'READY_FOR_SHIPMENT', '2016-10-11'),
  (3, 'Elena', 'Dunovskaya', '0984231204', 'Sumy', '7', 5865, 2, 'CASH_ON_DELIVERY', 'READY_FOR_SHIPMENT', '2016-12-22'),
  (1, 'Alex', 'Drogichinskij', '0674861352', 'Ilichevsk', '3', 570, 2, 'PRIVAT_CARD', 'AWAITING_FOR_PAYMENT', '2016-02-22');

INSERT INTO order_items (order_id, product_attr_id, product_id, product_name, product_price, product_quantity) VALUES
  (1, 3, 2, 'Potal Nazionale', 385, 1),
  (1, 6, 3, 'Ferrario klej rozovyj', 220, 2),
  (2, 2, 1, 'Shellac Manetti', 235, 3),
  (2, 7, 4, 'Potal Kitaj', 145, 4),
  (3, 7, 4, 'Potal Kitaj', 145, 5),
  (4, 2, 1, 'Shellac Manetti', 235, 6),
  (4, 3, 2, 'Potal Nazionale', 385, 7),
  (4, 6, 3, 'Ferrario klej rozovyj', 220, 8),
  (5, NULL , 5, 'Divolo Bitum Vosk', 570, 1)
;

