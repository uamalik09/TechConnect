// controllers/StudentController.js
const Student = require('../Models/Student');

// Register a new student
const registerStudent = async (req, res) => {
  try {
    // Extract student info and club/SIG info from request body
    const { name, rollNumber, email, phoneNumber, clubId, clubName, sigId, sigName } = req.body;
    
    // Extract club and SIG from URL path (alternative way to get this information)
    const url = req.originalUrl;
    const pathParts = url.split('/');
    const studentsIndex = pathParts.findIndex(part => part === 'students');
    
    // Use either the provided club/SIG from body or extract from URL
    const club = clubName || (studentsIndex >= 0 ? pathParts[studentsIndex + 1] : null);
    const sig = sigName || (studentsIndex >= 0 && pathParts.length > studentsIndex + 2 ? pathParts[studentsIndex + 2] : null);
    
    if (!club || !sig) {
      return res.status(400).json({ message: 'Club and SIG information is required' });
    }

    // Check if student exists in the database
    let student = await Student.findOne({ rollNumber });
    
    if (student) {
      // Check if student already registered for this club/SIG
      const alreadyRegistered = student.registrations.some(
        reg => reg.club.toUpperCase() === club.toUpperCase() && 
               reg.sig.toUpperCase() === sig.toUpperCase()
      );
      
      if (alreadyRegistered) {
        return res.status(400).json({ 
          message: `Student already registered for ${club.toUpperCase()} - ${sig.toUpperCase()}` 
        });
      }
      
      // Add new registration to existing student
      student.registrations.push({
        club: club.toUpperCase(),
        sig: sig.toUpperCase(),
        clubId,
        sigId
      });
      
      await student.save();
      
      return res.status(200).json({
        success: true,
        message: `Registration added for ${club.toUpperCase()} - ${sig.toUpperCase()}`,
        student: {
          name: student.name,
          rollNumber: student.rollNumber,
          email: student.email,
          registrations: student.registrations
        }
      });
    } else {
      // Check if email is already registered
      const emailExists = await Student.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
      
      // Create new student with registration
      student = new Student({
        name,
        rollNumber,
        email,
        phoneNumber,
        registrations: [{
          club: club.toUpperCase(),
          sig: sig.toUpperCase(),
          clubId,
          sigId
        }]
      });
      
      await student.save();
      
      res.status(201).json({
        success: true,
        message: 'Student registered successfully',
        student: {
          name: student.name,
          rollNumber: student.rollNumber,
          email: student.email,
          registrations: student.registrations
        }
      });
    }
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ message: 'Error registering student', error: error.message });
  }
};

// Get all students (for admin)
const getAllStudents = async (req, res) => {
  try {
    // Extract club and SIG from the original URL
    const url = req.originalUrl;
    const pathParts = url.split('/');
    
    // Find the indices for "students" to extract club and SIG
    const studentsIndex = pathParts.findIndex(part => part === 'students');
    
    if (studentsIndex >= 0 && pathParts.length > studentsIndex + 2) {
      const club = pathParts[studentsIndex + 1]; // e.g., 'iet'
      const sig = pathParts[studentsIndex + 2];  // e.g., 'rovisp'
      
      // Find students registered for this specific club and SIG
      const students = await Student.find({
        'registrations': {
          $elemMatch: {
            'club': club.toUpperCase(),
            'sig': sig.toUpperCase()
          }
        }
      }).select('-__v').sort({ registeredAt: -1 });
      
      return res.status(200).json(students);
    }
    
    // Fallback: return all students
    const students = await Student.find().select('-__v').sort({ registeredAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Error fetching students' });
  }
};

// Get student by roll number
const getStudentByRollNumber = async (req, res) => {
  try {
    const { rollNumber } = req.params;
    const student = await Student.findOne({ rollNumber }).select('-__v');
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.status(200).json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Error fetching student' });
  }
};

module.exports = { 
  registerStudent,
  getAllStudents,
  getStudentByRollNumber
};