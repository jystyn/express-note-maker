const express = require('express');
const app = express();
const PORT = process.env.PORT || 3333;
const path = require('path');

const api_routes = require('./routes/api_routes');

// Share Static/Browser Files ** this connects browser file to server
app.use(express.static(path.join(__dirname, 'public')));

// Attach clientside form data to the request.body object
app.use(express.urlencoded({extended: true}));

// Allow express to parse json
app.use(express.json());

// Load Routes localhost:3333/api
app.use('/api', api_routes);

// Start Server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});