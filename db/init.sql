CREATE TABLE IF NOT EXISTS tours (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR NOT NULL,
  duration      INTEGER NOT NULL,
  maxgroupsize  INTEGER NOT NULL,
  difficulty    VARCHAR NOT NULL,
  category      VARCHAR NOT NULL,
  price         NUMERIC(10,2) NOT NULL
);

INSERT INTO tours (name, duration, maxgroupsize, difficulty, category, price) VALUES
('Mountain Adventure', 7, 20, 'medium', 'adventure', 750.00),
('City Explorer', 3, 15, 'easy', 'city', 120.00),
('Desert Safari', 5, 12, 'medium', 'adventure', 680.00),
('Extreme Hiking', 10, 10, 'hard', 'sport', 1500.00),
('Beach Relax Tour', 4, 25, 'easy', 'leisure', 300.00),
('Jungle Expedition', 8, 14, 'hard', 'adventure', 1200.00),
('Historical Europe', 6, 30, 'easy', 'culture', 900.00),
('Kayaking Weekend', 2, 8, 'medium', 'sport', 250.00),
('Ski Alps Tour', 7, 18, 'hard', 'sport', 1800.00),
('Wine & Food Experience', 5, 20, 'easy', 'gastronomy', 650.00);

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user'
);

INSERT INTO users (username, email, password, role) VALUES
('john_doe', 'john.doe@example.com', '$2b$12$hashedpassword1', 'user'),
('jane_smith', 'jane.smith@example.com', '$2b$12$hashedpassword2', 'user'),
('admin', 'admin@example.com', '$2b$12$hashedpassword3', 'admin'),
('alice', 'alice@example.com', '$2b$12$hashedpassword4', 'user'),
('bob', 'bob@example.com', '$2b$12$hashedpassword5', 'user');