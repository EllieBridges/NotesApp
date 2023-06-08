// Node Express NPM package web framework
const express = require('express');

const app = express();

const cors = require('cors');

// import database functions
const dbFuncs = require('./db');

// Middleware used to communicated between different software - apply before handlers
app.use(express.json());

// Specifies which urls can communicate with the backend (*/ null means everything)
app.use(cors());

// http endpoints (listeners/ handlers), define url pathway and response/ requests to database

// Retrieve list of notes
app.get('/notes', async (req, res, next) => {
  try {
    const listNotes = await dbFuncs.allNotes();
    console.log(listNotes);
    res.send(listNotes);
  } catch (err) {
    next(err);
  }
});

// Retreive full note by ID
app.get('/notes/:noteId', async (req, res, next) => {
  try {
    const viewNote = await dbFuncs.readNote(req.params.noteId);
    console.log(viewNote);
    res.send(viewNote);
  } catch (err) {
    next(err);
  }
});

// Create a new note
app.post('/notes/newNote', async (req, res, next) => {
  try {
    const createNote = await dbFuncs.newNote(req.body.title, req.body.content);
    console.log(createNote);
    res.send();
  } catch (err) {
    next(err);
  }
});

app.put('/notes/:noteId', async (req, res, next) => {
  try {
    const updateNote = await dbFuncs.editNote(req.params.noteId, req.body.title, req.body.content);
    console.log(updateNote);
    res.send();
  } catch (err) {
    next(err);
  }
});

app.delete('/notes/:noteId', async (req, res, next) => {
  try {
    const deleteNote = await dbFuncs.deleteNote(req.params.noteId);
    console.log(deleteNote);
    res.send();
  } catch (err) {
    next(err);
  }
});

// Middleware error handler
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Used to bind and listen to connections on specified hosts/ ports
app.listen(3001, () => {
  console.log('Server is working');
});
