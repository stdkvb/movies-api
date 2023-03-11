const router = require('express').Router();
const { getUserInfo, updateUser } = require('../controllers/users');
const { updateUserValid } = require('../middlewares/validation');

router.get('/me', getUserInfo);
router.patch('/me', updateUserValid, updateUser);

module.exports = router;
