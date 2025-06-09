const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getUserInfo);

router.get('/:userId', getUserById);

module.exports = router;
