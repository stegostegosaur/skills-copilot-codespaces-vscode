// Create web server
var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var jwt = require('jsonwebtoken');

// Get all comments
router.get('/', function(req, res){
  Comment.find({}, function(err, comments){
    if(err) throw err;
    res.json(comments);
  });
});

// Get comment by id
router.get('/:id', function(req, res){
  Comment.findOne({_id: req.params.id}, function(err, comment){
    if(err) throw err;
    res.json(comment);
  });
});

// Create new comment
router.post('/', function(req, res){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token){
    jwt.verify(token, 'secret', function(err, decoded){
      if(err){
        res.json({success: false, message: 'Failed to authenticate token'});
      }else{
        var newComment = new Comment({
          text: req.body.text,


