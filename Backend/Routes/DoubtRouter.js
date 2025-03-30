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
router.post("/:clubId/:sigId/admin/:doubtId", authenticateUser, authorizeRoles("iet","ieee","acm","iste","ie"),doesDoubtExist, adminReply);
// router.post("/2/:sigId/admin/:doubtId", authenticateUser, authorizeRoles("ieee"),doesDoubtExist, adminReply);
// router.post("/3/:sigId/admin/:doubtId", authenticateUser, authorizeRoles("acm"),doesDoubtExist, adminReply);
// router.post("/4/:sigId/admin/:doubtId", authenticateUser, authorizeRoles("iste"),doesDoubtExist, adminReply);
// router.post("/5/:sigId/admin/:doubtId", authenticateUser, authorizeRoles("ie"),doesDoubtExist, adminReply);

module.exports = router;