// Create web server for comments

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set the path to the folder where the comments will be stored
const commentsPath = path.join(__dirname, 'comments.json');

// Function to read comments from the file
function readComments() {
  try {
    const comments = fs.readFileSync(commentsPath, 'utf8');
    return JSON.parse(comments);
  } catch (err) {
    console.error('Error reading comments', err);
    return [];
  }
}

// Function to write comments to the file
function writeComments(comments) {
  try {
    fs.writeFileSync(commentsPath, JSON.stringify(comments, null, 2));
  } catch (err) {
    console.error('Error writing comments', err);
  }
}

// Route to get the comments
app.get('/comments', (req, res) => {
  res.json(readComments());
});

// Route to post a comment
app.post('/comments', (req, res) => {
  const comment = req.body;
  const comments = readComments();
  comments.push(comment);
  writeComments(comments);
  res.json(comment);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});