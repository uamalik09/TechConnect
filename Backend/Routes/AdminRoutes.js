const express = require("express");
const { makeAdmin, getAllUsers } = require("../Controllers/MakeadminController");
const adminAuth = require("../Middlewares/AdminAuth");

const router = express.Router();

router.post("/make-admin", adminAuth, makeAdmin);
router.get("/get-all-users", getAllUsers);


module.exports = router;
