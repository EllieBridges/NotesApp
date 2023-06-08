const { Client } = require('pg');
const dbClient = new Client({
    user: 'postgres',
    password: 'password'
});


//define query functions to be sent from server
async function allNotes() {
    try {
        const response = await dbClient.query('SELECT * FROM notes')
        return response.rows;
    }
    catch (err) {
        console.log(err)
    }
}

// Where specific id/ variable called up use alternative $ value for security.
async function readNote(noteId) {
    try {
        const response = await dbClient.query(`SELECT * FROM notes WHERE id ='$1'`, [noteId])
        return response.rows;
    }
    catch (err) {
        console.log(err)
    }
}

async function newNote(title, content) {
    try {
        const response = await dbClient.query('INSERT INTO notes (title, content) VALUES $1, $2,'[title, content])
    }
    catch (err) {
        console.log(err)
    }
}

async function editNote(noteId, newTitle, newContent) {
    try {
        const response = await dbClient.query(`UPDATE notes SET 
        title = '$1',
        content = '$2' WHERE id ='$3'`,
            [newTitle, newContent, noteId])
    }
    catch (err) {
        console.log(err)
    }
}

async function deleteNote(noteId) {
    try {
        const response = await dbClient.query(`DELETE FROM notes WHERE id ='$1'`, [noteId])
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = {
    allNotes,
    readNote,
    newNote,
    editNote,
    deleteNote
}