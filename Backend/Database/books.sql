CREATE DATABASE book_store;

CREATE TABLE books(
id INT AUTO_INCREMENT primary key ,
title VARCHAR(100) NOT NULL,
author VARCHAR(100) NOT NULL,
price FLOAT(10,2),
image_url VARCHAR(200),
rating FLOAT(2,1) DEFAULT 0,
description VARCHAR(1000),
quantity INT NOT NULL

);


category_id INT NOT NULL,
FOREIGN KEY (category_id) REFERENCES category(id),
soldOut INT NOT NULL

 INSERT INTO books(title, author, price, image_url, rating, description, quantity,soldout,category_id) VALUES
('Clean Code', 'Robert C. Martin', 10.5, 'images/cleanCode.webp', 5, 'A handbook of agile software craftmanship. Emphasizes the importance of writing clear, readable, and maintainable code.', 20,0,4),
('Introduction to Algorithms', 'Thomas H. Cormen', 20, 'images/introToAlgo.webp', 5, 'This book provides a comprehensive introduction to the modern study of computer algorithms. It presents many algorithms and covers them in considerable depth, yet makes their design accessible to all levels of readers. All the analyses are laid out, some simple, some more involved. We have tried to keep explanations clear without sacrificing depth of coverage or mathematical rigor.', 20,0,2);

CREATE TABLE USERS (
	id INT primary key AUTO_INCREMENT,
	username VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	priority INT NOT NULL
);


CREATE TABLE USER_ROLE(
	id INT AUTO_INCREMENT UNIQUE,
	role VARCHAR(100) NOT NULL DEFAUlT 'customer'
);




CREATE TABLE customer_order(
	id INT AUTO_INCREMENT UNIQUE,
	customer_name VARCHAR(2000) NOT NULL,
	address VARCHAR(2000) NOT NULL,
	bookname VARCHAR(100) NOT NULL,
	quantity INT NOT NULL,
	totalprice FLOAT(10,2) NOT NULL,
	checkout BOOLEAN DEFAULT FALSE
);


INSERT INTO user_role(role) VALUES
('admin'),('customer');


CREATE TABLE slider_items (
	id INT AUTO_INCREMENT UNIQUE,
	image_url VARCHAR(50) NOT NULL
);

INSERT INTO slider_items(image_url) VALUES 
('images/cleanCode.webp'),('images/introToAlgo.webp'),('images/GoogleAdvertisingTool.jpg');







INSERT INTO users(username, password, role_id) VALUES
('namvothien3','12345','customer'),('admin','admin','admin');



CREATE TABLE cart_item (
	id INT AUTO_INCREMENT primary key,
	title VARCHAR(100) UNIQUE NOT NULL,
	quantity INT NOT NULL
);

CREATE TABLE orders (
	id INT AUTO_INCREMENT primary key,
	customer_name VARCHAR(200) NOT NULL,
	address VARCHAR(100) NOT NULL, 
	 
	totalprice FLOAT(100,3) NOT NULL,
	checkedout TINYINT(1) NOT NULL,
	done TINYINT(1) NOT NULL,
	quantity bigint NOT NULL,
	phonenumber VARCHAR(100) NOT NULL,
	paymentmethod INT NOT NULL
);








CREATE TABLE ContactInfo (
	id INT AUTO_INCREMENT PRIMARY KEY,
	firstname VARCHAR(100) NOT NULL,
	lastname VARCHAR(100) NOT NULL,
	phone VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	message VARCHAR(1000) NOT NULL
);



CREATE TABLE order_booknames (
	order_id INT,
	bookname VARCHAR(255),
	FOREIGN KEY (order_id) REFERENCES orders(id)
	);




                                                
										\
CREATE TABLE category (
	id INT AUTO_INCREMENT UNIQUE PRIMARY KEY,
	name VARCHAR(255) NOT NULL
);

