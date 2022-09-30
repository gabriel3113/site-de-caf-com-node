create database jazz;

use jazz;

create table user(
    id int(11) unique primary key auto_increment,
    nome varchar(100) not null,
    email varchar(100) unique not null,
    senha varchar(45) not null,
    telefone varchar(14) unique not null,
    cpf varchar(11) unique not null
);

