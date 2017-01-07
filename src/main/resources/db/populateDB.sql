TRUNCATE TABLE products_attr, attr_values, attr, products_to_orders, orders, customers,
products_to_categories, categories, products, user_roles, users CASCADE;

ALTER SEQUENCE products_attr_product_attr_id_seq RESTART WITH 1;
ALTER SEQUENCE attr_values_value_id_seq RESTART WITH 1;
ALTER SEQUENCE attr_attr_id_seq RESTART WITH 1;
ALTER SEQUENCE orders_id_seq RESTART WITH 1;
ALTER SEQUENCE customers_id_seq RESTART WITH 1;
ALTER SEQUENCE categories_id_seq RESTART WITH 1;
ALTER SEQUENCE products_id_seq RESTART WITH 1;
ALTER SEQUENCE users_id_seq RESTART WITH 1;

INSERT INTO users (name, password) VALUES
  ('User', '$2a$10$Sh0ZD2NFrzRRJJEKEWn8l.92ROEuzlVyzB9SV1AM8fdluPR0aC1ni'),
  ('Admin', '$2a$10$WejOLxVuXRpOgr4IlzQJ.eT4UcukNqHlAiOVZj1P/nmc8WbpMkiju');

INSERT INTO user_roles (role, user_id) VALUES
  ('ROLE_USER', 1),
  ('ROLE_ADMIN', 2),
  ('ROLE_USER', 2);

INSERT INTO products (name, price, quantity) VALUES
  ('Shellac Manetti', 235, 22),
  ('Potal Nazionale', 385, 44),
  ('Ferrario klej rozovyj', 220, 33),
  ('Potal Kitaj', 145, 11),
  ('Divolo Bitum Vosk', 570, 1);

INSERT INTO attr (name) VALUES
  ('Container'),
  ('Leaves quantity');

INSERT INTO attr_values (attr_id, name) VALUES
  (1, '0.1 (plastic)'),
  (1, '0.25 (plastic)'),
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
  (4, 3);

INSERT INTO customers (name, last_name, phone_number, city, nova_poshta, email) VALUES
  ('Alex', 'Drogichinskij', '0674861352', 'Ilichevsk', '3', 'drogychynsky@gmail.com'),
  ('Sergei', 'Goltvjanskij', '0938754590', 'Kiev', '31', 'goltvyanskyy@gmail.com'),
  ('Elena', 'Dunovskaya', '0984231204', 'Sumy', '7', 'katerina.tcherednichenko@yandex.ru'),
  ('WithNoOrderName', 'WithNoOrderLastName', '0980000000', 'ZeroTown', '0', 'zero@yandex.ru');

INSERT INTO orders (customer_id, user_id
                    --   , date_placed
) VALUES
  (2, 2
   --     , '2016-09-15 09:00:00'
  ),
  (2, 2
   --     , '2016-11-17 10:00:00'
  ),
  (1, 2
   --     , '2016-10-11 17:00:00'
  ),
  (3, 2
   --     , '2016-12-22 16:00:00'
  );

INSERT INTO products_to_orders (product_id, order_id) VALUES
  (2, 1),
  (3, 1),
  (1, 2),
  (4, 2),
  (4, 3),
  (1, 4),
  (2, 4),
  (3, 4);

