# ALTER TABLE malikovs_gilder.osms_customers MODIFY COLUMN id INT(10) UNSIGNED;
# COMMIT;
# ALTER TABLE malikovs_gilder.osms_customers MODIFY COLUMN id INT(10) UNSIGNED AUTO_INCREMENT;
# COMMIT;


-- TRUNCATE TABLE products_attr, attr_values, attr, order_items, orders, customers,
-- products_to_categories, categories, products, user_roles, users CASCADE;

-- ALTER SEQUENCE products_attr_product_attr_id_seq RESTART WITH 1;
-- ALTER SEQUENCE attr_values_value_id_seq RESTART WITH 1;
-- ALTER SEQUENCE attr_attr_id_seq RESTART WITH 1;
-- ALTER SEQUENCE orders_id_seq RESTART WITH 1;
-- ALTER SEQUENCE customers_id_seq RESTART WITH 1;
-- ALTER SEQUENCE categories_id_seq RESTART WITH 1;
-- ALTER SEQUENCE products_id_seq RESTART WITH 1;
-- ALTER SEQUENCE users_id_seq RESTART WITH 1;
-- ALTER SEQUENCE order_items_id_seq RESTART WITH 1;


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
  ('Елена', 'Дуновская', '0984231204', 'Sumy', '7', 'katerina.tcherednichenko@yandex.ru'),
  ('WithNoOrderName', 'WithNoOrderLastName', '0980000000', 'ZeroTown', '0', 'zero@yandex.ru'),
  ('Dname1', 'DLastName1', '11111111111', '111111', '1', '111zero@yandex.ru'),
  ('Dname2', 'DLastName2', '22222222222', '222222', '2','2zero@yandex.ru'),
  ('Dname3', 'DLastName3', '33333333333', '333333', '3','3zero@yandex.ru');

INSERT INTO osms_orders (customer_id, customer_name, customer_last_name, customer_phone_number, customer_city, customer_nova_poshta, total_sum, user_id, payment_type, status
  , date_placed
) VALUES
  (2, 'Sergei', 'Goltvjanskij', '0938754590', 'Kiev', '31', 825, 2, 'PB', 'A_FOR_P'
    , '2016-09-15'
  ),
  (2, 'Sergei', 'Goltvjanskij', '0938754590', 'Kiev', '31', 1285, 2, 'NP', 'TO_SHIP'
    , '2016-11-17'
  ),
  (1, 'Alex', 'Drogichinskij', '0674861352', 'Ilichevsk', '3', 725, 2, 'PB', 'TO_SHIP'
    , '2016-10-11'
  ),
  (3, 'Elena', 'Дуновская', '0984231204', 'Sumy', '7', 5865, 2, 'NP', 'SHIPPED'
    , '2016-12-22'
  ),
  (1, 'Alex', 'Drogichinskij', '0674861352', 'Ilichevsk', '3', 570, 2, 'PB', 'A_FOR_P'
    , '2016-02-22'
  );

INSERT INTO osms_order_items (order_id, product_attr_id, product_id, product_name, product_price, product_quantity) VALUES
  (1, 3, 2, 'Potal Nazionale 100 leaves', 385, 1),
  (1, 6, 3, 'Ferrario klej rozovyj 0.25L (plastic)', 220, 2),
  (2, 2, 1, 'Shellac Manetti 0.25L (plastic)', 235, 3),
  (2, 7, 4, 'Potal Kitaj 100 leaves', 145, 4),
  (3, 7, 4, 'Potal Kitaj 100 leaves', 145, 5),
  (4, 2, 1, 'Shellac Manetti 0.25L (plastic)', 235, 6),
  (4, 3, 2, 'Potal Nazionale 100 leaves', 385, 7),
  (4, 6, 3, 'Ferrario klej rozovyj 0.25L (plastic)', 220, 8),
  (5, 0 , 5, 'Divolo Bitum Vosk', 333, 1)
;

