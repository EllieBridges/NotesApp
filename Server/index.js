// Node Express NPM package web framework
const express = require('express');
const app = express();

const cors = require('cors');

// Middleware used to communicated between different software - apply before handlers 
app.use(express.json());

// Specifies which urls can communicate with the backend (* means everything)
app.use(cors());

app.get();

app.get();

app.post();

app.put();

app.delete();






//Used to bind and listen to connections on specified hosts/ ports
app.listen(3001, () => {
    console.log('Server is working')
})
