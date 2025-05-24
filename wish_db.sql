CREATE DATABASE wish_db;
USE wish_db;

CREATE TABLE wishes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    attendance ENUM('yes', 'no') NOT NULL,
    guests INT,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);