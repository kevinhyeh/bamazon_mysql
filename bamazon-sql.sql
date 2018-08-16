DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price INT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ('Mystery Chips', 'Food', 2, 10), ('Warm Fruit', 'Food', 5, 10), ('Fermented Tofu', 'Food', 6, 10), ('Stale Fries', 'Food', 10, 10), ('Uncooked Pasta', 'Food', 10, 10), ('Three Legged Table', 'Furniture', 20, 10), ('Coushinless Couch', 'Furniture', 50, 10), ('Solar Powered Bed', 'Furniture', 80, 10), ('Flickering Lamp', 'Furniture', 15, 10), ('Acute Chair', 'Furniture', 15, 10);

CREATE TABLE departments (
    department_id INT NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    over_head_costs INT NOT NULL,
    PRIMARY KEY (department_id)
)