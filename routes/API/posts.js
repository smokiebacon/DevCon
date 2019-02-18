const express = require('express');
const router = express.Router();

//GET /api/posts/test
// @desc tests posts route
//@access is public
router.get('/test', (req, res) => res.json({
    msg: "Posts works"
}));



module.exports = router;