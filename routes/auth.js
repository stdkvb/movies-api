const router = require('express').Router();
const { createUser, loginUser, logoutUser } = require('../controllers/users');
const { createUserValid, loginUserValid } = require('../middlewares/validation');

router.post('/signup', createUserValid, createUser);
router.post('/signin', loginUserValid, loginUser);
router.post('/signout', logoutUser);

module.exports = router;
