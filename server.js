const express = require('express');
const app = express();
const PORT = process.env.PORT || 3131;
const path = require('path');

// Brings in api_routes file
const api_routes = require('./routes/api_routes');

// Share Static/Browser Files ** this connects public file to server
app.use(express.static(path.join(__dirname, 'public')));

// When the user goes to localhost:3131/ they are shown index.htmlmysq
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/public/index.html');
});

// When the user goes to localhost:3131/notes they are shown notes.html
app.get('/notes', (request, response) => {
    response.sendFile(__dirname + '/public/notes.html');
});

// Attach clientside form data to the request.body object
app.use(express.urlencoded({extended: true}));

// Allow express to parse json
app.use(express.json());

// Load Routes localhost:3131/api
app.use('/api', api_routes);

// Start Server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});