DROP TABLE IF EXISTS sessions CASCADE;

CREATE TABLE sessions (
  id SERIAL PRIMARY KEY NOT NULL,
  start_date VARCHAR(255),
  end_date VARCHAR(255),
  clients_id INTEGER REFERENCES clients(id) NOT NULL
);