const router = require('express').Router();
const { register, login } = require('../../controller/admin/user');
// middleware that is specific to this router
router.use((req, res, next) => {
    console.log('Admin User Route called =>Time: ', Date.now())
    next()
});

router.post("/register", register);

router.post("/login", login);

router.get("/user/:id", (req, res)=>{
    return res.status(200).send('Hsi');
});

module.exports = router;
