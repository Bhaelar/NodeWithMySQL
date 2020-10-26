"use strict";

var express = require('express');

var mysql = require('mysql'); // Create connection


var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql'
}); // Connect

db.connect(function (err) {
  if (err) {
    throw err;
  }

  console.log('MySql connected...');
});
var app = express(); // Create db

app.get('/createdb', function (req, res) {
  var sql = 'CREATE DATABASE nodemysql';
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send('Database created');
  });
}); // Create table 

app.get('/createposttable', function (req, res) {
  var sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send('Posts table created...');
  });
}); // Insert post 1

app.get('/addpost1', function (req, res) {
  var post = {
    title: 'Post One',
    body: 'This is post number one'
  };
  var sql = 'INSERT INTO posts SET ?';
  var query = db.query(sql, post, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send('Post one added...');
  });
}); // Insert post 2

app.get('/addpost2', function (req, res) {
  var post = {
    title: 'Post Two',
    body: 'This is post number two'
  };
  var sql = 'INSERT INTO posts SET ?';
  var query = db.query(sql, post, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send('Post two added...');
  });
}); // Select posts

app.get('/getposts', function (req, res) {
  var sql = 'SELECT * FROM posts';
  var query = db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send('Posts fetched...');
  });
}); // Select single post

app.get('/getpost/:id', function (req, res) {
  var sql = "SELECT * FROM posts where id = ".concat(req.params.id);
  var query = db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send('Post fetched...');
  });
}); // Update post

app.get('/updatepost/:id', function (req, res) {
  var newTitle = 'Updated title';
  var sql = "UPDATE posts SET title = '".concat(newTitle, "' WHERE id = ").concat(req.params.id);
  var query = db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send('Post updated...');
  });
}); // DELETE post

app.get('/deletepost/:id', function (req, res) {
  var sql = "DELETE FROM posts WHERE id = ".concat(req.params.id);
  var query = db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send('Post deleted...');
  });
});
app.listen('3000', function () {
  console.log('Server started on port 3000');
});