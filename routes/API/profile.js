const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const Auth = require('../../models/Auth');

//GET /api/profile/test
// @desc tests auth route
//@access is public
router.get('/test', (req, res) => res.json({
    msg: "Profile works"
}));

//GET /api/profile/ instead of :id, can get JWT token to uniquely identiy user
// @desc get current user profile
//@access is private
router.get('/', passport.authenticate('jwt', {
        session: false
    }),
    async (req, res) => {
        const errors = {};
        try {
            const foundProfile = await Profile.findOne({
                user: req.user.id
            })
            if (!foundProfile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
        } catch (err) {
            res.status(404).json(err)
        }
    }
);



module.exports = router;