//create web server
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { v4: uuidv4 } = require('uuid');

//create server
app.listen(3000, function () {
    console.log('Server started on port 3000');
});

//create static files
app.use(express.static(path.join(__dirname, 'public')));

//create comments array
let comments = [];

//create get request
app.get('/api/comments', function (req, res) {
    res.send(comments);
});

//create post request
app.post('/api/comments', jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    let comment = {
        id: uuidv4(),
        name: req.body.name,
        comment: req.body.comment,
        date: req.body.date
    };
    comments.push(comment);
    res.send(comment);
});

//create delete request
app.delete('/api/comments/:id', function (req, res) {
    let id = req.params.id;
    let index = comments.findIndex(comment => comment.id === id);
    comments.splice(index, 1);
    res.send(id);
});
