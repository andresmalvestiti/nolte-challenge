CREATE SCHEMA IF NOT EXISTS fitness;

CREATE TABLE IF NOT EXISTS fitness.workouts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) UNIQUE NOT NULL,
    file_url VARCHAR(255) NOT NULL,
    feedback TEXT,
    score INT,
    insert_date TIMESTAMP NOT NULL
);