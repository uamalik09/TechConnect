const QuizSubmission = require('../Models/Result');
const Student = require('../Models/Student');
const Question = require('../Models/Questions');
const { notifyStudentOfStatusUpdate } = require('../Services/NotificationService');
 // This imports the models object

// Submit quiz answers
const submitQuiz = async (req, res) => {
  try {
    console.log('Received data:', req.body);
    
    const { rollNumber, studentName, quizModel, answers } = req.body;
    
    // Validate answers format
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        message: 'Invalid answers format. Expected an array of answer objects.'
      });
    }
    
    // Get all questions for this quiz model to check correct answers
    const modelName = quizModel.toLowerCase();
    if (!Question[modelName]) {
      return res.status(400).json({ 
        message: `Invalid quiz model: ${quizModel}`,
        success: false
      });
    }
    const questions = await Question[modelName].find({});
    
    if (!questions || questions.length === 0) {
      return res.status(400).json({ 
        message: `No questions found for quiz model: ${quizModel}`,
        success: false
      });
    }
    
    console.log(`Found ${questions.length} questions for quiz model: ${quizModel}`);
    
    // Calculate score - with error handling
    let scoreResult;
    try {
      scoreResult = calculateScore(answers, questions);
      console.log("Score calculation result:", scoreResult);
    } catch (scoreError) {
      console.error("Error calculating score:", scoreError);
      return res.status(400).json({ 
        message: 'Error calculating score: ' + scoreError.message,
        success: false
      });
    }
    
    // Create quiz submission
    const submission = new QuizSubmission({
      rollNumber,
      studentName: studentName,
      quizModel,
      answers,
      score: scoreResult.score,
      totalQuestions: scoreResult.totalQuestions,
      correctAnswers: scoreResult.correctAnswers
    });
    
    await submission.save();
    
    res.status(201).json({
      success: true,
      message: 'Quiz submitted successfully',
      score: scoreResult.score,
      totalQuestions: scoreResult.totalQuestions,
      correctAnswers: scoreResult.correctAnswers.length
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ 
      message: 'Error submitting quiz', 
      error: error.message,
      success: false
    });
  }
};

// Helper function to calculate score
const calculateScore = (answers, questions) => {
  let score = 0;
  let correctAnswers = [];
  
  // Create a map of questions by ID for easy lookup
  const questionMap = {};
  questions.forEach(question => {
    const questionId = question._id.toString();
    questionMap[questionId] = question;
  });
  
  console.log("Question IDs in database:", Object.keys(questionMap));
  console.log("Answer Question IDs:", answers.map(a => a.questionId));
  
  // Process each answer
  for (const answer of answers) {
    const { questionId, selectedOption } = answer;
    
    // Find the corresponding question
    const question = questionMap[questionId];
    
    // Skip if question not found
    if (!question) {
      console.warn(`Question not found for ID: ${questionId}`);
      continue;
    }
    
    // Determine the correct answer field - adapt this to your schema
    // This handles different possible field names
    let correctOption = null;
    if (question.correctOption) {
      correctOption = question.correctOption;
    } else if (question.correctAnswer) {
      correctOption = question.correctAnswer;
    } else if (question.answer) {
      correctOption = question.answer;
    }
    
    if (!correctOption) {
      console.warn(`No correct answer found for question ID: ${questionId}`);
      continue;
    }
    
    // Check if the answer is correct
    if (selectedOption === correctOption) {
      // Add the marks for this question to the total score
      const marks = question.marks || 1; // Default to 1 mark if not specified
      score += marks;
      correctAnswers.push(questionId);
      console.log(`Correct answer for question ${questionId}: +${marks} marks`);
    } else {
      console.log(`Incorrect answer for question ${questionId}: selected "${selectedOption}", correct was "${correctOption}"`);
    }
  }
  
  return {
    score,
    totalQuestions: questions.length,
    correctAnswers
  };
};

// Get all submissions (for admin)
const getAllSubmissions = async (req, res, quizModel) => {
  try {
    // Filter submissions by quizModel
    const query = quizModel ? { quizModel } : {};
    
    const submissions = await QuizSubmission.find(query)
      .sort({ submittedAt: -1 });
      
    console.log(`Fetched ${submissions.length} submissions for quiz model: ${quizModel || 'all'}`);
    
    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ 
      message: 'Error fetching submissions',
      error: error.message,
      success: false 
    });
  }
};

// Update qualification status
// controllers/QuizController.js
// Update the updateQualificationStatus function to use the notification service


// Update qualification status
const updateQualificationStatus = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { qualifiedRound2, qualifiedRound3, recruited } = req.body;
    
    const submission = await QuizSubmission.findById(submissionId);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    
    // Track if there was a status change
    const statusChanged = 
      (qualifiedRound2 !== undefined && submission.qualifiedRound2 !== qualifiedRound2) ||
      (qualifiedRound3 !== undefined && submission.qualifiedRound3 !== qualifiedRound3) ||
      (recruited !== undefined && submission.recruited !== recruited);
    
    // Update qualification status
    if (qualifiedRound2 !== undefined) submission.qualifiedRound2 = qualifiedRound2;
    if (qualifiedRound3 !== undefined) submission.qualifiedRound3 = qualifiedRound3;
    if (recruited !== undefined) submission.recruited = recruited;
    
    await submission.save();
    
    // Send notification to student if status changed
    if (statusChanged) {
      const notified = await notifyStudentOfStatusUpdate(submission);
      console.log(`Notification ${notified ? 'sent' : 'failed'} for student ${submission.rollNumber}`);
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Qualification status updated successfully',
      notificationSent: statusChanged
    });
  } catch (error) {
    console.error('Error updating qualification status:', error);
    res.status(500).json({ message: 'Error updating qualification status', error: error.message });
  }
};

module.exports = {
  submitQuiz,
  getAllSubmissions,
  updateQualificationStatus
};