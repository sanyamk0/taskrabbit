const express = require("express");
const router = express.router();
const uploadController = require("../controllers/uploadController");

router.post("/image", uploadController.uploadImage);

module.exports = router;
