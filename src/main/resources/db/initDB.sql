DROP TABLE IF EXISTS products_to_categories;
DROP TABLE IF EXISTS products_to_orders;
DROP TABLE IF EXISTS users_roles;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;

CREATE TABLE users
(
  id       SERIAL PRIMARY KEY,
  name     VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  CONSTRAINT users_unique_name_idx UNIQUE (name)
);

CREATE TABLE users_roles
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
  id       SERIAL PRIMARY KEY,
  name     VARCHAR,
  price    INTEGER DEFAULT 0,
  quantity INTEGER DEFAULT 0,
  CONSTRAINT products_name_idx UNIQUE (name)
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
  id          SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  user_id     INTEGER NOT NULL,
  date_placed TIMESTAMP DEFAULT now(),
  FOREIGN KEY (customer_id) REFERENCES customers (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE products_to_orders (
  product_id INTEGER NOT NULL,
  order_id   INTEGER NOT NULL,
  PRIMARY KEY (product_id, order_id),
  FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE
);

