const express = require("express");
const passport = require("passport");
const controller = require("../controllers/orders");
const router = express.Router();

router.post("/checkout", passport.authenticate("jwt", {session: false}), controller.checkout);

module.exports = router;