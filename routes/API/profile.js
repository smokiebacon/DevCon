const express = require('express');
const router = express.Router();

//GET /api/profile/test
// @desc tests auth route
//@access is public
router.get('/test', (req, res) => res.json({
    msg: "Profile works"
}));



module.exports = router;