DROP TABLE IF EXISTS products_to_categories;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS products_attr;
DROP TABLE IF EXISTS attr_values;
DROP TABLE IF EXISTS attr;


CREATE TABLE users
(
  id       SERIAL PRIMARY KEY,
  name     VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  CONSTRAINT users_unique_name_idx UNIQUE (name)
);

CREATE TABLE user_roles
(
  user_id INTEGER NOT NULL,
  role    VARCHAR NOT NULL,
  CONSTRAINT users_roles_idx UNIQUE (user_id, role),
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE customers (
  id           SERIAL PRIMARY KEY,
  name         VARCHAR,
  last_name    VARCHAR,
  phone_number VARCHAR,
  city         VARCHAR,
  nova_poshta  VARCHAR,
  email        VARCHAR,
  CONSTRAINT customers_phone_number_idx UNIQUE (phone_number),
  CONSTRAINT customers_email_idx UNIQUE (email)
);

CREATE TABLE products (
  id               SERIAL PRIMARY KEY,
  name             VARCHAR,
  price            INTEGER DEFAULT 0,
  quantity         INTEGER DEFAULT 0,
  unlimited        INTEGER DEFAULT 0,
  different_prices INTEGER DEFAULT 0,
  CONSTRAINT products_name_idx UNIQUE (name)
);

--attribute categories  name_ru-Ru!! should be but hyphen is not ok in postgres
CREATE TABLE attr (
  attr_id SERIAL PRIMARY KEY,
  name    VARCHAR
);

--attribute categories  name_ru-Ru!! should be but hyphen is not ok in postgres
CREATE TABLE attr_values (
  value_id SERIAL PRIMARY KEY,
  attr_id  INTEGER NOT NULL,
  name     VARCHAR,
  FOREIGN KEY (attr_id) REFERENCES attr (attr_id)
);

CREATE TABLE products_attr (
  product_attr_id SERIAL PRIMARY KEY,
  product_id      INTEGER,
  price           INTEGER,
  count           INTEGER, --count is current available quantity of product
  attr_value_id   INTEGER,
  FOREIGN KEY (attr_value_id) REFERENCES attr_values (value_id)
);

CREATE TABLE categories (
  id   SERIAL PRIMARY KEY,
  name VARCHAR,
  CONSTRAINT categories_name_idx UNIQUE (name)
);

CREATE TABLE products_to_categories (
  product_id  INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  PRIMARY KEY (product_id, category_id),
  FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
);

CREATE TABLE orders (
  id           SERIAL PRIMARY KEY,
  customer_id  INTEGER NOT NULL,
  customer_name         VARCHAR,
  customer_last_name    VARCHAR,
  customer_phone_number VARCHAR,
  customer_city         VARCHAR,
  customer_nova_poshta  VARCHAR,
  total_sum INTEGER,
  user_id      INTEGER NOT NULL,
  payment_type VARCHAR,
  status       VARCHAR,
  date_placed  DATE DEFAULT now(),
  FOREIGN KEY (customer_id) REFERENCES customers (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id   INTEGER,
  product_id INTEGER,
  product_name VARCHAR,
  product_price INTEGER,
  product_quantity   INTEGER NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE
);

