var express = require('express');
var router = express.Router();
const categoryRoute = require("./categories")
const productRoute = require("./product")
const userRoute = require('./users')
const oderRoute = require('./order')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/api/category', categoryRoute);
router.use('/api/product', productRoute);
router.use('/api/user', userRoute);
router.use('/api/order', oderRoute);

module.exports = router;
