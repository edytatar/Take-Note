// Importing
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');
let notes = require('./db/notes.json');


const PORT = 3001;

// Instantiating express application and assigning to variable app
const app = express();


// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(express.static('public'));

// Sending index.html page and notes.html page
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);


// Get request for db.json
app.get('/api/notes', (req, res) => {
    res.json(notes)
});


app.post('/api/notes', (req, res) => {
    console.info(`The ${req.method} request was recieved.`);


    const { title, text } = req.body;

    const newNote = {
        title,
        text,
        id: uuid(),
    };

    notes.push(newNote)
    console.log(notes)

    const noteString = JSON.stringify(notes);

    fs.writeFile(`./db/notes.json`, noteString, (err) =>
        err
            ? console.log(err)
            : console.log(
                `New ${newNote.title} note has been written to the JSON file.`
            )
    );

    res.json(notes);

    const response = {
        status: 'success',
        body: newNote,
    };

});




app.listen(PORT, () => {
    console.log(`App listening at http:localhost:${PORT}`);
})




