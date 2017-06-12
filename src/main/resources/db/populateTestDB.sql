SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE shop_system_test.osms_order_items;
TRUNCATE TABLE shop_system_test.osms_user_roles;
TRUNCATE TABLE shop_system_test.jos_jshopping_products_to_categories;
TRUNCATE TABLE shop_system_test.jos_jshopping_products;
TRUNCATE TABLE shop_system_test.jos_jshopping_categories;
TRUNCATE TABLE shop_system_test.jos_jshopping_products_attr;
TRUNCATE TABLE shop_system_test.jos_jshopping_attr_values;
TRUNCATE TABLE shop_system_test.jos_jshopping_attr;
TRUNCATE TABLE shop_system_test.osms_users;
TRUNCATE TABLE shop_system_test.osms_orders;
TRUNCATE TABLE shop_system_test.osms_customers;
SET FOREIGN_KEY_CHECKS = 1;

ALTER  TABLE shop_system_test.osms_orders AUTO_INCREMENT 1;
ALTER  TABLE shop_system_test.osms_users AUTO_INCREMENT 1;
ALTER  TABLE shop_system_test.osms_customers AUTO_INCREMENT 1;
ALTER  TABLE shop_system_test.jos_jshopping_products AUTO_INCREMENT 1;
ALTER  TABLE shop_system_test.jos_jshopping_categories AUTO_INCREMENT 1;
ALTER  TABLE shop_system_test.jos_jshopping_products_attr AUTO_INCREMENT 1;
ALTER  TABLE shop_system_test.jos_jshopping_attr_values AUTO_INCREMENT 1;
ALTER  TABLE shop_system_test.osms_order_items AUTO_INCREMENT 1;

INSERT INTO osms_users (name, password) VALUES
('user', '$2a$11$bRQR2FxnBrKnr/PS0eaDUeEQzO2ZtYJllGPIkdekZ0q6rJVJrCmXm'), -- password = '1111'
('admin', '$2a$11$bRQR2FxnBrKnr/PS0eaDUeEQzO2ZtYJllGPIkdekZ0q6rJVJrCmXm'); -- password = '1111'

INSERT INTO osms_user_roles (role, user_id) VALUES
('ROLE_USER', 1),
('ROLE_ADMIN', 2),
('ROLE_USER', 2);

INSERT INTO osms_customers (name, last_name, phone_number, city, nova_poshta, email) VALUES
  ('Alex', 'Drogichinskij', '0674861352', 'Ilichevsk', '3', 'drogychynsky@gmail.com'),
  ('Sergei', 'Goltvjanskij', '0938754590', 'Kiev', '31', 'goltvyanskyy@gmail.com'),
  ('Elena', 'Dunovskaya', '0984231204', 'Sumy', '7', 'katerina.tcherednichenko@yandex.ru'),
  ('WithNoOrderName', 'WithNoOrderLastName', '0980000000', 'ZeroTown', '0', 'zero@yandex.ru');

INSERT INTO jos_jshopping_products (`name_ru-Ru`, product_price, unlimited, product_quantity, different_prices) VALUES
('Shellac Manetti', 235, 1, 22, 1),
('Potal Nazionale', 385, 0, 44, 1),
('Ferrario klej rozovyj', 220, 1, 33, 1),
('Potal Kitaj', 145, 0, 11, 1);

INSERT INTO jos_jshopping_attr (`name_ru-Ru`) VALUES
('Container'),
('Leaves quantity');

INSERT INTO jos_jshopping_attr_values (attr_id, `name_ru-Ru`) VALUES
(1, '0.1L (plastic)'),
(1, '0.25L (plastic)'),
(2, '100 leaves'),
(2, '500 leaves');

INSERT INTO jos_jshopping_products_attr (product_id, price, count, attr_value_id) VALUES
(1, 110, 88, 1),
(1, 235, 89, 2),
(2, 385, 22, 3),
(2, 1745, 23, 4),
(3, 110, 44, 1),
(3, 220, 45, 2),
(4, 145, 55, 3),
(4, 585, 56, 4);

INSERT INTO jos_jshopping_categories (`name_ru-Ru`) VALUES
('Laki'),
('Klei'),
('Potal i zoloto');

INSERT INTO jos_jshopping_products_to_categories (product_id, category_id) VALUES
(1, 1),
(2, 3),
(3, 2),
(4, 3);

INSERT INTO osms_orders (customer_id, customer_name, customer_last_name, customer_phone_number, customer_city, customer_nova_poshta, total_sum, user_id, payment_type, status
  , date_placed
) VALUES
  (2, 'Sergei', 'Goltvjanskij', '0938754590', 'Kiev', '31', 825, 2, 'PB', 'WFP'
    , '2016-09-15'
  ),
  (2, 'Sergei', 'Goltvjanskij', '0938754590', 'Kiev', '31', 1285, 2, 'NP', 'SHP'
    , '2016-11-17'
  ),
  (1, 'Alex', 'Drogichinskij', '0674861352', 'Ilichevsk', '3', 725, 2, 'PB', 'SHP'
    , '2016-10-11'
  ),
  (3, 'Elena', 'Дуновская', '0984231204', 'Sumy', '7', 5865, 2, 'NP', 'SHP'
    , '2016-12-22'
  )
;

INSERT INTO osms_order_items (order_id, product_attr_id, product_id, product_name, product_price, product_quantity) VALUES
  (1, 3, 2, 'Potal Nazionale 100 leaves', 385, 1),
  (1, 6, 3, 'Ferrario klej rozovyj 0.25L (plastic)', 220, 2),
  (2, 2, 1, 'Shellac Manetti 0.25L (plastic)', 235, 3),
  (2, 7, 4, 'Potal Kitaj 100 leaves', 145, 4),
  (3, 7, 4, 'Potal Kitaj 100 leaves', 145, 5),
  (4, 2, 1, 'Shellac Manetti 0.25L (plastic)', 235, 6),
  (4, 3, 2, 'Potal Nazionale 100 leaves', 385, 7),
  (4, 6, 3, 'Ferrario klej rozovyj 0.25L (plastic)', 220, 8)
;

