const { Pool } = require('pg');

const dbClient = new Pool({
  user: 'postgres',
  password: 'password',
});

// define query functions to be sent from server
async function allNotes() {
  const response = await dbClient.query('SELECT * FROM notes');
  return response.rows;
}

// Where specific id/ variable called up use alternative $ value for security.
async function readNote(noteId) {
  const response = await dbClient.query('SELECT * FROM notes WHERE id =$1', [noteId]);
  return response.rows;
}

async function newNote(title, content) {
  const response = await dbClient.query('INSERT INTO notes (title, content) VALUES $1, $2 RETURNING *', [title, content]);
  return response.rows;
}

async function editNote(noteId, newTitle, newContent) {
  const response = await dbClient.query(
    `UPDATE notes SET 
        title = $1,
        content = $2 WHERE id =$3 RETURNING *`,
    [newTitle, newContent, noteId],
  );
  return response.rows;
}

async function deleteNote(noteId) {
  const response = await dbClient.query('DELETE FROM notes WHERE id =$1 RETURNING *', [noteId]);
  return response.rows;
}

module.exports = {
  allNotes,
  readNote,
  newNote,
  editNote,
  deleteNote,
};
