
CREATE DATABASE IF NOT EXISTS g00472878;
USE g00472878;

-- Table for the user

DROP TABLE IF EXISTS users;

CREATE TABLE users (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       email VARCHAR(150) NOT NULL UNIQUE,
                       password VARCHAR(150) NOT NULL
);



INSERT INTO users (email, password) VALUES
    ('user@123.com', 'pass');



-- Table for the products, then insert them

CREATE TABLE products (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          name VARCHAR(100) NOT NULL,
                          description VARCHAR(255) NOT NULL,
                          price DECIMAL(10,2) NOT NULL,
                          image VARCHAR(255) NOT NULL
);

INSERT INTO products (name, description, price, image) VALUES
       ('iPhone 15', 'Apple iPhone 15', 999.00, 'products/iphone15.jpg'),
       ('Samsung Galaxy S24', 'Samsung flagship with AMOLED display', 899.00, 'products/galaxyS24.jpg'),
       ('Google Pixel 8', 'Clean Android experience', 799.00, 'products/pixel8.jpg'),
       ('OnePlus 12', 'Fast, smooth, and great value', 749.00, 'products/oneplus12.jpg'),
       ('Xiaomi 13', 'High-end specs', 699.00, 'products/xiaomi13.jpg');

