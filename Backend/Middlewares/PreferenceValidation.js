// Middleware to validate preferences
const validatePreferences = (req, res, next) => {
    const { clubPreferences } = req.body;
    
    // Validate that clubPreferences exists and is an array
    if (!clubPreferences || !Array.isArray(clubPreferences)) {
      return res.status(400).json({ message: 'Valid club preferences are required' });
    }
    
    // Validate that there are exactly 5 preferences
    if (clubPreferences.length !== 5) {
      return res.status(400).json({ message: 'You must provide exactly 5 club preferences' });
    }
    
    // Validate that all required clubs are present
    const requiredClubs = ['IET', 'IEEE', 'IE', 'ISTE', 'ACM'];
    const hasAllClubs = requiredClubs.every(club => 
      clubPreferences.includes(club)
    );
    
    if (!hasAllClubs) {
      return res.status(400).json({ message: 'All clubs (IET, IEEE, IE, ISTE, ACM) must be included in preferences' });
    }
    
    // Validate there are no duplicate clubs
    const uniqueClubs = new Set(clubPreferences);
    if (uniqueClubs.size !== clubPreferences.length) {
      return res.status(400).json({ message: 'Each club can only appear once in your preferences' });
    }
    
    next();
  };
  
  module.exports = {
    validatePreferences
  };