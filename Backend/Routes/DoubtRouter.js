const express = require("express");
const {
  getDoubts,
  postDoubt,
  adminReply,
} = require("../Controllers/DoubtController");
const { doesDoubtExist } = require("../Middlewares/DoubtValidation");
const { authenticateUser, authorizeRoles } = require("../Middlewares/AuthMiddleware");
const router = express.Router();
router.get("/:clubId/:sigId",authenticateUser, getDoubts);
// router.post("/:clubId/:sigId", postDoubt);
// router.post("/:clubId/:sigId/admin", adminReply);
router.post("/:clubId/:sigId", authenticateUser, postDoubt);
router.post("/:clubId/:sigId/admin/:doubtId", authenticateUser, authorizeRoles("iet"),doesDoubtExist, adminReply);

module.exports = router;