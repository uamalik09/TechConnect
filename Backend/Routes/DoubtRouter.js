const express = require("express");
const {
  getDoubts,
  postDoubt,
  adminReply,
} = require("../Controllers/DoubtController");

const router = express.Router();
router.get("/:clubId/:sigId", getDoubts);
router.post("/:clubId/:sigId", postDoubt);
router.post("/:clubId/:sigId/admin", adminReply);

module.exports = router;