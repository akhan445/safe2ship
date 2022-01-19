DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders(
  id SERIAL PRIMARY KEY NOT NULL,
  customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
  shipper_id INTEGER REFERENCES shippers(id) ON DELETE CASCADE,
  package_id INTEGER REFERENCES packages(id) ON DELETE CASCADE,
  map text
);