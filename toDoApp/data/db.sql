create database taskList;

use taskList;

create table `user` (
    id int primary key AUTO_INCREMENT,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50 NOT NULL)
);

create table task (
    idTask int primary key AUTO_INCREMENT,
    idUser int NOT NULL,
    title VARCHAR(100) NOT NULL,
    completed boolean DEFAULT false
    FOREIGN KEY(idUser) references user(id)
);