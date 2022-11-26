const router = require('express').Router();
const { register, login, profile } = require('../../controller/admin/user');
const verifyToken = require('../../middleware/auth');
// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Admin User Route called =>Time: ', Date.now())
    next()
});

router.post("/register", register);

router.post("/login", login);

router.post("/me", verifyToken, profile);

module.exports = router;
