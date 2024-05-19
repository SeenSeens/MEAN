var express = require('express');
var router = express.Router();
const Auth = require("../middleware/auth");

const {
  signup,
  login,
  logout,
  logoutAll
} = require("../controllers/users.controller");
router.post('/register', signup);
router.post('/login', login);
router.post('/logout', Auth, logout);
router.post('/logoutall', Auth, logoutAll);

module.exports = router;
