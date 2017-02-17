# DROP TABLE IF EXISTS osms_order_items;
# DROP TABLE IF EXISTS osms_orders;
# DROP TABLE IF EXISTS osms_customers CASCADE ;
# DROP TABLE IF EXISTS osms_user_roles;
# DROP TABLE IF EXISTS osms_users;


CREATE TABLE osms_users
(
  id       SERIAL PRIMARY KEY,
  name     VARCHAR(35) NOT NULL,
  password VARCHAR(35) NOT NULL,
  CONSTRAINT users_unique_name_idx UNIQUE (name)
);

CREATE TABLE osms_user_roles
(
  user_id INTEGER NOT NULL,
  role    VARCHAR(20) NOT NULL,
  CONSTRAINT users_roles_idx UNIQUE (user_id, role),
  FOREIGN KEY (user_id) REFERENCES osms_users (id) ON DELETE CASCADE
);

CREATE TABLE osms_customers (
  id           SERIAL PRIMARY KEY,
  name         VARCHAR(35),
  last_name    VARCHAR(35),
  phone_number VARCHAR(25),
  city         VARCHAR(80),
  nova_poshta  VARCHAR(20),
  email        VARCHAR(100),
  CONSTRAINT customers_phone_number_idx UNIQUE (phone_number)
#   ,CONSTRAINT customers_email_idx UNIQUE (email)
);

CREATE TABLE osms_orders (
  id           SERIAL PRIMARY KEY,
  customer_id  INTEGER,
  customer_name         VARCHAR(35),
  customer_last_name    VARCHAR(35),
  customer_phone_number VARCHAR(25),
  customer_city         VARCHAR(100),
  customer_nova_poshta  VARCHAR(50),
  total_sum INTEGER,
  user_id      INTEGER NOT NULL,
  payment_type VARCHAR(35),
  status       VARCHAR(35),
  date_placed  TIMESTAMP DEFAULT now(),
  FOREIGN KEY (customer_id) REFERENCES osms_customers (id),
  FOREIGN KEY (user_id) REFERENCES osms_users (id)
);

CREATE TABLE osms_order_items (
  id SERIAL PRIMARY KEY,
  order_id   INTEGER,
  product_attr_id INTEGER,
  product_id INTEGER,
  product_name VARCHAR(255),
  product_price INTEGER,
  product_quantity   INTEGER,
  FOREIGN KEY (order_id) REFERENCES osms_orders (id) ON DELETE CASCADE
);

