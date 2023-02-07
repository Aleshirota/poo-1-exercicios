-- Active: 1674684971134@@127.0.0.1@3306
CREATE TABLE videos (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    titulo TEXT NOT NULL,
		duracao TEXT UNIQUE NOT NULL,
		created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE courses (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT UNIQUE NOT NULL,
    lessons INTEGER NOT NULL
);

INSERT INTO videos (id, titulo, duracao)
VALUES
	("u001", "Top Gun", "40 min"),
	("u002", "Todo mundo em Panico", "50 min");

	INSERT INTO courses (id, name, lessons)
VALUES
("c001", "Javascript", 5),
("c002", "React", 10),
("c003", "Typescript", 15);

   SELECT * FROM  videos;
DROP TABLE videos;

 SELECT * FROM  courses;
DROP TABLE courses;