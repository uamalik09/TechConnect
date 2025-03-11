// services/NotificationService.js
const Student = require('../Models/Student');
const nodemailer = require('nodemailer');

// Configure nodemailer (you'll need to set up your email provider)
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmailNotification = async (student, subject, message) => {
  try {
    await transporter.sendMail({
      from: 'hanvithapeteti@gmail.com',
      to: student.email,
      subject: subject,
      html: message
    });
    console.log(`Email sent to ${student.email}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

const generateQualificationEmail = (student, submission) => {
  let statusMessage = '';
  
  if (submission.recruited) {
    statusMessage = '<p>Congratulations! You have been <strong>RECRUITED</strong> based on your performance.</p>';
  } else if (submission.qualifiedRound3) {
    statusMessage = '<p>You have qualified for <strong>Round 3</strong> of the selection process.</p>';
  } else if (submission.qualifiedRound2) {
    statusMessage = '<p>You have qualified for <strong>Round 2</strong> of the selection process.</p>';
  } else {
    statusMessage = '<p>Thank you for your participation. Unfortunately, you have not qualified for the next round.</p>';
  }
  
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
      <h2 style="color: #333; text-align: center;">Quiz Results Update</h2>
      <p>Dear ${student.name},</p>
      <p>Your quiz results have been evaluated.</p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Score:</strong> ${submission.score}</p>
        <p style="margin: 5px 0;"><strong>Status:</strong> ${statusMessage}</p>
      </div>
      <p>You can view your complete results by logging into your account.</p>
      <p>If you have any questions, please contact the recruitment team.</p>
      <p>Best regards,<br>Recruitment Team</p>
    </div>
  `;
};

const notifyStudentOfStatusUpdate = async (submission) => {
  try {
    const student = await Student.findOne({ rollNumber: submission.rollNumber });
    if (!student) {
      console.error(`Student with roll number ${submission.rollNumber} not found`);
      return false;
    }
    
    const subject = 'Update on Your Quiz Results';
    const message = generateQualificationEmail(student, submission);
    
    return await sendEmailNotification(student, subject, message);
  } catch (error) {
    console.error('Error notifying student:', error);
    return false;
  }
};

module.exports = {
  notifyStudentOfStatusUpdate
};