const express = require('express');
const router = express.Router();
const Auth = require('../../models/Auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys')

//GET /api/auth/test
// @desc tests auth route
//@access is public
router.get('/test', (req, res) => res.json({
    msg: "Auth works"
}));


//GET /api/auth/register
// @desc Register a User
//@access is public
router.post('/register', async (req, res) => {
    let user = await Auth.findOne({
        email: req.body.email
    });
    if (user) {
        return res.status(400).json({
            email: "Email already exists"
        })
    } else {
        const password = req.body.password;
        const hashedPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        let newUser = {};
        newUser = req.body;
        newUser.password = hashedPassword;
        const createdUser = await Auth.create(newUser);
        console.log(createdUser, 'THIS IS CREATED USER')
        res.json(newUser);
    }
});

//GET /api/auth/login
// @desc Login a User, returining a JWT Token
//@access is public

router.post('/login', async (req, res) => {
    try {
        //find user
        const loggedUser = await Auth.findOne({
            email: req.body.email
        });
        if (loggedUser) {
            //check if password match
            if (bcrypt.compareSync(req.body.password, loggedUser.password)) {
                //creating payload
                const payload = {
                    id: loggedUser.id,
                    name: loggedUser.name
                }
                //sign token upon successful login
                const token = jwt.sign(payload, keys.secretKey, {
                    expiresIn: 7200
                })
                console.log(payload)
                return res.json({
                    success: true,
                    token
                });
            } else {
                res.send('Email or password is incorrect');
            }

        } else {
            res.send('Email does not exist');
        }
    } catch (err) {
        console.log('HITTING THE ERROR', err);
        res.send(err);
    }
})

//GET /api/auth/current
// @desc returns current user
//@access is private

router.get('/current', passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        })
    })






module.exports = router;