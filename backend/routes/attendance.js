
const express = require("express");
const multer = require("multer");
const router = express.Router();
const controller = require("../controllers/attendanceController");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.get("/", controller.getAll);
router.post("/", upload.single("screenshot"), controller.add);
router.put("/:id", upload.single("screenshot"), controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
