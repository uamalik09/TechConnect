const express = require("express");
const router = express.Router();
const { 
  findStudentByRollNumber, 
  updateStudentPreferences, 
} = require("../Controllers/PreferenceController");

const { validatePreferences } = require("../Middlewares/PreferenceValidation");
const { authenticateUser, authorizeRoles } = require("../Middlewares/AuthMiddleware");


router.get("/iet/cipher/find/:rollNumber", authenticateUser, authorizeRoles("iet", "user"), 
  (req, res) => findStudentByRollNumber(req, res, "student"));

router.post("/iet/cipher/preferences/:rollNumber", authenticateUser, authorizeRoles("user"), 
  validatePreferences, 
  (req, res) => updateStudentPreferences(req, res, "student"));

router.get("/iet/cipher/preferences/all", authenticateUser, authorizeRoles("iet"), 
  (req, res) => getAllStudentPreferences(req, res));

router.delete("/iet/cipher/preferences/delete/:id", authenticateUser, authorizeRoles("iet"), 
  (req, res) => deleteStudentPreference(req, res));

// IEEE club preference routes (if you need separate routes for different clubs)
router.get("/ieee/preferences/all", authenticateUser, authorizeRoles("ieee_admin"), 
  (req, res) => getAllStudentPreferences(req, res, "ieee"));

router.get("/ieee/preferences/settings", authenticateUser, authorizeRoles("ieee_admin", "student"), 
  (req, res) => getPreferenceSettings(req, res, "ieee"));

router.post("/ieee/preferences/settings/update", authenticateUser, authorizeRoles("ieee_admin"), 
  validatePreferenceSettings, 
  (req, res) => updatePreferenceSettings(req, res, "ieee"));

module.exports = router;