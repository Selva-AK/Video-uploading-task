CREATE DATABASE IF NOT EXISTS Selva_Novalnet;

USE Selva_Novalnet;

CREATE TABLE IF NOT EXISTS user_profile(
    ID INT(10) PRIMARY KEY AUTO_INCREMENT,
    text VARCHAR(50),
    email VARCHAR(50) UNIQUE KEY,
    password VARCHAR(50),
    tel INT(20), 
    time VARCHAR(20),
    url VARCHAR(100),
    week VARCHAR(30),
    checkbox VARCHAR(10),
    radiobox VARCHAR(10),
    FILE_NAME VARCHAR(100) NOT NULL 
);

CREATE TABLE IF NOT EXISTS Admin_login(
    Email VARCHAR(100) NOT NULL,
    Password VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS Create_table(
    Field_type VARCHAR(30) NOT NULL,
    Mandatory VARCHAR(30) NOT NULL,
    Name VARCHAR(40) NOT NULL,
    ID VARCHAR(30) NOT NULL,
    Placeholder VARCHAR(50) NULL
);