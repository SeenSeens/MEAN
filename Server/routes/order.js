const express = require("express");
const router = express.Router();
const {
    newOrder,
    updateOrder
} = require("../controllers/order.controller");

router.post('/', newOrder );
router.put('/:id', updateOrder );

module.exports = router;