CREATE TABLE IF NOT EXISTS groups (
  id INTEGER PRIMARY KEY,
  name TEXT DEFAULT "",
  limit_cents INTEGER DEFAULT 2000,
  deadline DATE
);

INSERT INTO groups
  (name, limit_cents, deadline)
VALUES
  ("Santa's Secret Squad", 1000, '2021-12-20'),
  ("Snow Sisters", 2000, '2021-12-24'),
  ("Lights of My Life", 3000, '2021-12-25'),
  ("The Claus Family", 500, '2021-11-30'),
  ("Buy Me Something Nice", 5000, '2021-12-25');
