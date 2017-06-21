DROP TABLE IF EXISTS shop_system_test.osms_order_items;
DROP TABLE IF EXISTS shop_system_test.osms_user_roles;
DROP TABLE IF EXISTS shop_system_test.osms_orders CASCADE ;
DROP TABLE IF EXISTS shop_system_test.osms_users;
DROP TABLE IF EXISTS shop_system_test.osms_customers CASCADE ;
DROP TABLE IF EXISTS shop_system_test.jos_jshopping_products_to_categories;
DROP TABLE IF EXISTS shop_system_test.jos_jshopping_products CASCADE ;
DROP TABLE IF EXISTS shop_system_test.jos_jshopping_categories;
DROP TABLE IF EXISTS shop_system_test.jos_jshopping_products_attr;
DROP TABLE IF EXISTS shop_system_test.jos_jshopping_attr_values;
DROP TABLE IF EXISTS shop_system_test.jos_jshopping_attr;

CREATE TABLE osms_users (
  id       INT(11) PRIMARY KEY AUTO_INCREMENT,
  name     VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  CONSTRAINT users_unique_name_idx UNIQUE (name)
);

CREATE TABLE osms_user_roles
(
  user_id INT(11) NOT NULL,
  role    VARCHAR(20) NOT NULL,
  CONSTRAINT users_roles_idx UNIQUE (user_id, role),
  FOREIGN KEY (user_id) REFERENCES osms_users (id) ON DELETE CASCADE
);

CREATE TABLE osms_customers (
  id           INT(11) PRIMARY KEY AUTO_INCREMENT,
  name         VARCHAR(35),
  last_name    VARCHAR(35),
  phone_number VARCHAR(25),
  city         VARCHAR(80),
  nova_poshta  VARCHAR(20),
  email        VARCHAR(100),
  note         TEXT,
  CONSTRAINT customers_phone_number_idx UNIQUE (phone_number)
    #   ,CONSTRAINT customers_email_idx UNIQUE (email)
);

CREATE TABLE jos_jshopping_products (
  product_id        INT(11) PRIMARY KEY AUTO_INCREMENT,
  `name_ru-Ru`      VARCHAR(255),
  product_price     DECIMAL(18,6) DEFAULT 0,
  product_quantity  DECIMAL(12,2) DEFAULT 0,
  unlimited         TINYINT(1) DEFAULT 0,
  different_prices  TINYINT(1) DEFAULT 0,
  supplier          VARCHAR(10),
  CONSTRAINT products_name_idx UNIQUE (`name_ru-Ru`)
);

CREATE TABLE jos_jshopping_attr (
  attr_id INT(11) PRIMARY KEY AUTO_INCREMENT,
  `name_ru-Ru`    VARCHAR(255)
);

CREATE TABLE jos_jshopping_attr_values (
  value_id INT(11) PRIMARY KEY AUTO_INCREMENT,
  attr_id  INT(11) NOT NULL,
  `name_ru-Ru`    VARCHAR(255),
  FOREIGN KEY (attr_id) REFERENCES jos_jshopping_attr (attr_id)
);

CREATE TABLE jos_jshopping_products_attr (
  product_attr_id INT(11) PRIMARY KEY AUTO_INCREMENT,
  product_id      INT(11),
  price           DECIMAL(14,4) DEFAULT 0,
  count           DECIMAL(12,2), /* current available quantity of product */
  attr_value_id   INT(11),
  FOREIGN KEY (attr_value_id) REFERENCES jos_jshopping_attr_values (value_id)
);

CREATE TABLE jos_jshopping_categories (
  category_id     INT(11) PRIMARY KEY AUTO_INCREMENT,
  `name_ru-Ru`    VARCHAR(255),
  CONSTRAINT categories_name_idx UNIQUE (`name_ru-Ru`)
);

CREATE TABLE jos_jshopping_products_to_categories (
  product_id  INT(11) NOT NULL,
  category_id INT(11) NOT NULL,
  PRIMARY KEY (product_id, category_id),
  FOREIGN KEY (product_id) REFERENCES jos_jshopping_products (product_id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES jos_jshopping_categories (category_id) ON DELETE CASCADE
);

CREATE TABLE osms_orders (
  id           INT(11) PRIMARY KEY AUTO_INCREMENT,
  customer_id  INT(11),
  customer_name         VARCHAR(35),
  customer_last_name    VARCHAR(35),
  customer_phone_number VARCHAR(25),
  customer_city         VARCHAR(100),
  customer_nova_poshta  VARCHAR(50),
  total_sum INT(11),
  user_id      INT(11) NOT NULL,
  payment_type VARCHAR(35),
  status       VARCHAR(35),
  date_placed  TIMESTAMP DEFAULT now(),
  comment       TEXT,
  FOREIGN KEY (customer_id) REFERENCES osms_customers (id),
  FOREIGN KEY (user_id) REFERENCES osms_users (id)
);

CREATE TABLE osms_order_items (
  id         INT(11) PRIMARY KEY AUTO_INCREMENT,
  order_id   INT(11),
  product_attr_id INT(11),
  product_id INT(11),
  product_name VARCHAR(255),
  product_price INT(11),
  product_quantity   INT(11),
  FOREIGN KEY (order_id) REFERENCES osms_orders (id) ON DELETE CASCADE
);