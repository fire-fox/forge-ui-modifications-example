const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
// Define a route for the specific path
app.get('/license-decoupling-demo', (req, res) => {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.decode(token);
        console.log('FIT:', decoded);
    } else {
        console.log('No Bearer Token found');
    }
    console.log("------------------------")
    res.send('Hello World!');
});
// Default route
app.get('/', (req, res) => {
    res.send('Hello, Node.js!');
});
// Start the server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});