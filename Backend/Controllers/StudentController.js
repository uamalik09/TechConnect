// controllers/StudentController.js
const Student = require('../Models/Student');

// Register a new student
const registerStudent = async (req, res) => {
  try {
    const { name, rollNumber, email, phoneNumber } = req.body;

    // Check if student with roll number already exists
    const existingStudent = await Student.findOne({ rollNumber });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with this roll number already exists' });
    }

    // Check if email is already registered
    const emailExists = await Student.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Create new student
    const student = new Student({
      name,
      rollNumber,
      email,
      phoneNumber
    });

    await student.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Student registered successfully',
      student: {
        name: student.name,
        rollNumber: student.rollNumber,
        email: student.email
      }
    });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ message: 'Error registering student', error: error.message });
  }
};

// Get all students (for admin)
const getAllStudents = async (req, res) => {
  try {
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