const Student = require('../Models/Student');
const QuizSubmission = require('../Models/Result'); // Make sure this matches your model file

/**
 * Get the quiz status for the authenticated user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getQuizStatus = async (req, res) => {
    try {
        // Get student email from auth middleware
        const studentEmail = req.user.email;
        
        // Find the student by email
        const student = await Student.findOne({ email: studentEmail });
        console.log('Student found:', student);
        console.log('Looking for submission with roll number:', student.rollNumber);
        
        if (!student) {
            return res.status(404).json({ 
                success: false, 
                message: 'Student not found' 
            });
        }
        
        // Find all submissions by roll number
        const submissions = await QuizSubmission.find({ rollNumber: student.rollNumber });
        
        // If no submissions found
        if (!submissions || submissions.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No quiz submission found',
                status: {
                    hasSubmitted: false,
                    score: null,
                    qualifiedRound2: false,
                    qualifiedRound3: false,
                    recruited: false
                }
            });
        }
        
        // Create a map of all submissions by quiz model
        const quizStatusMap = {};
        
        submissions.forEach(submission => {
            quizStatusMap[submission.quizModel] = {
                hasSubmitted: true,
                score: submission.score,
                qualifiedRound2: submission.qualifiedRound2,
                qualifiedRound3: submission.qualifiedRound3,
                recruited: submission.recruited,
                submittedAt: submission.submittedAt
            };
        });
        
        // Return the status
        return res.status(200).json({
            success: true,
            status: quizStatusMap
        });
        
    } catch (error) {
        console.error('Error fetching quiz status:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
};

/**
 * Get the status for a specific quiz model
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getSpecificQuizStatus = async (req, res) => {
    try {
        const { quizModel } = req.params;
        const studentEmail = req.user.email;
        
        // Find the student by email
        const student = await Student.findOne({ email: studentEmail });
        
        if (!student) {
            return res.status(404).json({ 
                success: false, 
                message: 'Student not found' 
            });
        }
        
        // Find the submission for the specific quiz model
        const submission = await QuizSubmission.findOne({ 
            rollNumber: student.rollNumber,
            quizModel: quizModel
        });
        
        // If no submission found for this quiz model
        if (!submission) {
            return res.status(404).json({
                success: false,
                message: `No submission found for ${quizModel}`,
                status: {
                    hasSubmitted: false,
                    score: null,
                    qualifiedRound2: false,
                    qualifiedRound3: false,
                    recruited: false
                }
            });
        }
        
        // Return the status
        return res.status(200).json({
            success: true,
            status: {
                hasSubmitted: true,
                quizModel: submission.quizModel,
                score: submission.score,
                qualifiedRound2: submission.qualifiedRound2,
                qualifiedRound3: submission.qualifiedRound3,
                recruited: submission.recruited,
                submittedAt: submission.submittedAt
            }
        });
        
    } catch (error) {
        console.error('Error fetching specific quiz status:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
};