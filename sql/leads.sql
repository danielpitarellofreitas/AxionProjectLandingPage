CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(254),
  business TEXT,
  phone TEXT
);


-- Just use to tests:
INSERT INTO leads (name, email, business, phone)
VALUES ('zezão', 'zezin@gmail.com', 'Padaria', '11 99694-1202');

SELECT * FROM leads;