-- Table creation and queries for the query functions in db.js

CREATE TABLE notes (
   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
   title text,
   content text
   
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insert
INSERT INTO notes (title, content)
VALUES
('Shopping List', 'Apples, Pears');

-- Read notes (all)
SELECT * FROM notes;

-- Read note
SELECT * FROM notes WHERE id='6e3eaada-532b-4d00-8e59-66c3960f6d59';

-- Updating note
UPDATE notes set title = 'New title',
content = 'New content' WHERE id='6e3eaada-532b-4d00-8e59-66c3960f6d59';

-- Deleting note
DELETE FROM notes WHERE id = '6e3eaada-532b-4d00-8e59-66c3960f6d59';