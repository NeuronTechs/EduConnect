const express = require("express");
const AuthController = require("../controllers/user.controller");
const router = express.Router();
router.route("/login").post(AuthController.login);
router.route("/refreshToken").post(AuthController.refreshToken);
router.route("/logout").post(AuthController.logout);
module.exports = router;