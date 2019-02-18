const express = require('express');
const router = express.Router();

//GET /api/auth/test
// @desc tests auth route
//@access is public
router.get('/test', (req, res) => res.json({
    msg: "Auth works"
}));



module.exports = router;