// Cerate Web Server
// 1. Load the express module
// 2. Create an express application
// 3. Create a middleware function
// 4. Create a route
// 5. Start the server
// 6. Create a middleware function to handle error
// 7. Create a middleware function to handle 404

// 1. Load the express module
const express = require('express');
const fs = require('fs');

// 2. Create an express application
const app = express();

// 3. Create a middleware function
app.use(express.json());

// 4. Create a route
app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Server Error');
            return;
        }
        res.send(data);
    });
});

app.post('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Server Error');
            return;
        }
        const comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile('./comments.json', JSON.stringify(comments, null, 2), (err) => {
            if (err) {
                res.status(500).send('Server Error');
                return;
            }
            res.status(201).send('Comment added');
        });
    });
});

// 6. Create a middleware function to handle error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server Error');
});

// 7. Create a middleware function to handle 404
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// 5. Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});