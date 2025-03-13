const Student = require('../Models/Student');

// Find student by roll number
const findStudentByRollNumber = async (req, res) => {
  try {
    const { rollNumber } = req.params;
    
    const student = await Student.findOne({ rollNumber });
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found. Please check your roll number.' });
    }
    
    // Return only necessary information
    res.json({
      name: student.name,
      rollNumber: student.rollNumber,
      clubPreferences: student.clubPreferences || []
    });
    
  } catch (error) {
    console.error('Error finding student:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update student preferences
const updateStudentPreferences = async (req, res) => {
  try {
    const { rollNumber } = req.params;
    const { clubPreferences } = req.body;
    
    // Find student
    const student = await Student.findOne({ rollNumber });
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    // Update preferences
    student.clubPreferences = clubPreferences;
    await student.save();
    
    res.json({
      message: 'Your preferences have been saved successfully!',
      name: student.name,
      rollNumber: student.rollNumber
    });
    
  } catch (error) {
    console.error('Error updating preferences:', error);
    res.status(500).json({ message: 'Failed to save preferences' });
  }
};

module.exports = {
  findStudentByRollNumber,
  updateStudentPreferences
};