const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//post model
const Post = require('../../models/Posts');


//Validation form
const validatePostInput = require('../../validation/post')

//GET /api/posts/
// @desc Create a post
//@access is private
router.post(
    '/',
    passport.authenticate('jwt', {
        session: false
    }),
    async (req, res) => {
        const {
            errors,
            isValid
        } = validatePostInput(req.body);

        // Check Validation
        if (!isValid) {
            // If any errors, send 400 with errors object
            return res.status(400).json(errors);
        }
        try {
            const newPost = new Post({
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            });
            newPost.save();
            res.json(newPost);
        } catch (errs) {
            res.send(errs)
        }
    }
);



module.exports = router;