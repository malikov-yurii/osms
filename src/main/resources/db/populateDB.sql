TRUNCATE TABLE products_to_orders, orders, customers,
products_to_categories, categories, products, users_roles, users CASCADE;

ALTER SEQUENCE orders_id_seq RESTART WITH 1;
ALTER SEQUENCE customers_id_seq RESTART WITH 1;
ALTER SEQUENCE categories_id_seq RESTART WITH 1;
ALTER SEQUENCE products_id_seq RESTART WITH 1;
ALTER SEQUENCE users_id_seq RESTART WITH 1;

INSERT INTO users (name, password) VALUES
  ('User', '$2a$10$Sh0ZD2NFrzRRJJEKEWn8l.92ROEuzlVyzB9SV1AM8fdluPR0aC1ni'),
  ('Admin', '$2a$10$WejOLxVuXRpOgr4IlzQJ.eT4UcukNqHlAiOVZj1P/nmc8WbpMkiju');

INSERT INTO users_roles (role, user_id) VALUES
  ('ROLE_USER', 1),
  ('ROLE_ADMIN', 2),
  ('ROLE_USER', 2);

INSERT INTO products (name, price, quantity) VALUES
  ('Shellac', 235, 22),
  ('Potal Nazionale', 385, 11),
  ('Ferrario klej rozovyj', 220, 33),
  ('Potal Kitaj', 145, 11);

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
  ('Elena', 'Dunovskaya', '0984231204', 'Sumy', '7', 'katerina.tcherednichenko@yandex.ru');

INSERT INTO orders (customer_id, user_id, date_placed) VALUES
  (2, 2, '2016-09-15 09:00:00'),
  (2, 2, '2016-11-17 10:00:00'),
  (1, 2, '2016-10-11 17:00:00'),
  (3, 2, '2016-12-22 16:00:00');

INSERT INTO products_to_orders (product_id, order_id) VALUES
  (2, 1),
  (3, 1),
  (1, 2),
  (4, 2),
  (4, 3),
  (1, 4),
  (2, 4),
  (3, 4);