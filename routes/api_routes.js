const notes_router = require('express').Router();
const fs = require('fs');
const path = require('path');
const db_path = path.join(__dirname, '../db/db.json');

function getNoteData() {
    return fs.promises.readFile(db_path, 'utf8')
        .then(data => JSON.parse(data));
}

notes_router.get('/notes', (request, response) => {
    getNoteData()
        .then(note_data => {
            response.json(note_data);
            console.log(note_data);
        })
        .catch(err => console.log(err));
});

notes_router.post('/notes', (request, response) => {
    getNoteData()
        .then(note_data => {
            const new_note = request.body
            console.log(new_note);

            note_data.push(new_note);
;
            fs.promises.WriteFile(db_path, JSON.stringify(note_data, null, 2))
                .then(() =>response.json(note_data))
                .catch(err => console.log(err));
        })
})

module.exports = notes_router;