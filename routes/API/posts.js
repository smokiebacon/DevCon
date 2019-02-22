const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//post model
const Post = require('../../models/Posts');

//Validation form
const validatePostInput = require('../../validation/post')

//GET /api/posts/
// @desc Get all posts
//@access is private
router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.find({})
            .sort({
                date: -1
            });
        res.json(allPosts);
    } catch (errors) {
        res.status(404).json({
            nopostfound: 'There are no posts'
        })
    }
})

//GET /api/posts/:id
// @desc Get post by id
//@access is Public
router.get('/:id', async (req, res) => {
    try {
        const onePost = await Post.findById(req.params.id)
            .sort({
                date: -1
            });
        res.json(onePost);
    } catch (errors) {
        res.status(404).json({
            nopostfound: 'No post found with that ID'
        });
    }
})



//POST /api/posts/
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
                name: req.user.name,
                avatar: req.user.avatar,
                user: req.user.id
            });
            newPost.save();
            res.json(newPost);
        } catch (errs) {
            res.send(errs)
        }
    }
);

//DELETE /api/posts/:id
// @desc DELETE a post
//@access is private
router.delete('/:id', passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    try {
        const foundPost = await Post.findByIdAndRemove(req.params.id);
        res.json(foundPost);
    } catch (errors) {
        res.status(404).json(errors);
    };
})

//route POST /api/posts/like/:id
// @desc like a post
//@access is private
router.post('/like/:id', passport.authenticate("jwt", {
    session: false
}), async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post == null) return res.status(404).json({
        postnotfound: 'No post found'
    });
    const index = post.likes.findIndex(l => {
        return l.user == req.user.id
    });
    index === -1 ? post.likes.push({
        user: req.user.id
    }) : post.likes.splice(index, 1);
    await post.save();
    res.json(post);
})

//route POST /api/posts/comment/:id
// @desc add comment to post
//@access is private
router.post('/comment/:id', passport.authenticate("jwt", {
    session: false
}), async (req, res) => {
    const {
        errors,
        isValid
    } = validatePostInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    try {
        const foundPost = await Post.findById(req.params.id);
        const newComment = {
            text: req.body.text,
            name: req.user.name,
            avatar: req.user.avatar,
            user: req.user.id
        };

        //add to comments array
        foundPost.comments.unshift(newComment);
        await foundPost.save();
        res.json(foundPost);
    } catch (errors) {
        res.status(404).json({
            postnotfound: 'No post found'
        });
    }
})

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
    '/comment/:id/:comment_id',
    passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {
        Post.findById(req.params.id)
            .then(post => {
                // Check to see if comment exists
                if (
                    post.comments.filter(
                        comment => comment._id.toString() === req.params.comment_id
                    ).length === 0
                ) {
                    return res
                        .status(404)
                        .json({
                            commentnotexists: 'Comment does not exist'
                        });
                }

                // Get remove index
                const removeIndex = post.comments
                    .map(item => item._id.toString())
                    .indexOf(req.params.comment_id);

                // Splice comment out of array
                post.comments.splice(removeIndex, 1);

                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({
                postnotfound: 'No post found'
            }));
    }
);
module.exports = router;