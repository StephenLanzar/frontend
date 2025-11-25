
const express = require("express");
const router = express.Router();
const controller = require("../controllers/recordController");

router.get("/", controller.getAll);
router.get("/student/:studentId", controller.getByStudent);
router.get("/class/:classId", controller.getByClass);

module.exports = router;
