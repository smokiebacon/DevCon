const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Posts');

//GET /api/posts/
// @desc Create a post
//@access is private
router.post('/', passport.authenticate('jwt', {
    session: false
}, async (req, res) => {
    try {
        const newPost = await new Post.create(req.body);
        newPost.save();
        res.json(newPost);
    } catch (errors) {
        res.json(errors)
    }
}))



module.exports = router;