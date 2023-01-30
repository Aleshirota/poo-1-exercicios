-- Active: 1674684971134@@127.0.0.1@3306
CREATE TABLE videos (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    titulo TEXT NOT NULL,
		duracao TEXT UNIQUE NOT NULL,
		created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO videos (id, titulo, duracao)
VALUES
	("u001", "Top Gun", "40 min"),
	("u002", "Todo mundo em Panico", "50 min");

   SELECT * FROM  videos;
DROP TABLE videos;