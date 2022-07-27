const notes_router = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('uuid').v4;
const db_path = path.join(__dirname, '../db/db.json');

// Reads in notes from db.json
function getNoteData() {
    return fs.promises.readFile(db_path, 'utf8')
        .then(data => JSON.parse(data));
}

// Gets saved notes
notes_router.get('/notes', (request, response) => {
    getNoteData()
        .then(note_data => response.json(note_data))
        .catch(err => console.log(err));
});

// Posts new note
notes_router.post('/notes', (request, response) => {
    getNoteData()
        .then(note_data => {
            const new_note = request.body;

            //Adds id to note so we can target them for delete
            new_note.id = uuid().slice(0, 4);

            note_data.push(new_note);

            fs.promises.writeFile(db_path, JSON.stringify(note_data, null, 2))
                .then(() => response.json(note_data))
                .catch(err => console.log(err)); 
        })
});

// Deletes selected note
notes_router.delete('/notes/:id', (request, response) => {
    getNoteData()
        .then(note_data => {
            const id = request.params.id;
            const obj = note_data.find(note_data => note_data.id === id);
            const index = note_data.indexOf(obj);

            note_data.splice(index, 1);

            fs.promises.writeFile(db_path, JSON.stringify(note_data, null, 2))
                .then(() => response.json(note_data))
                .catch(err => console.log(err));
        });

})

module.exports = notes_router;