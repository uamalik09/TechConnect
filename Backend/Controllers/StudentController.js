
const Student = require('../Models/Student');

const registerStudent = async (req, res) => {
  try {
    const { name, rollNumber, email, phoneNumber, clubId, clubName, sigId, sigName } = req.body;
    const url = req.originalUrl;
    const pathParts = url.split('/');
    const studentsIndex = pathParts.findIndex(part => part === 'students');
    const club = clubName || (studentsIndex >= 0 ? pathParts[studentsIndex + 1] : null);
    const sig = sigName || (studentsIndex >= 0 && pathParts.length > studentsIndex + 2 ? pathParts[studentsIndex + 2] : null);
    
    if (!club || !sig) {
      return res.status(400).json({ message: 'Club and SIG information is required' });
    }
    let student = await Student.findOne({ rollNumber });
    
    if (student) {
      const alreadyRegistered = student.registrations.some(
        reg => reg.club.toUpperCase() === club.toUpperCase() && 
               reg.sig.toUpperCase() === sig.toUpperCase()
      );
      
      if (alreadyRegistered) {
        return res.status(400).json({ 
          message: `Student already registered for ${club.toUpperCase()} - ${sig.toUpperCase()}` 
        });
      }
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
      const emailExists = await Student.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
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
const getAllStudents = async (req, res) => {
  try {
    const url = req.originalUrl;
    const pathParts = url.split('/');
    const studentsIndex = pathParts.findIndex(part => part === 'students');
    
    if (studentsIndex >= 0 && pathParts.length > studentsIndex + 2) {
      const club = pathParts[studentsIndex + 1]; 
      const sig = pathParts[studentsIndex + 2]; 
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
    const students = await Student.find().select('-__v').sort({ registeredAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Error fetching students' });
  }
};
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