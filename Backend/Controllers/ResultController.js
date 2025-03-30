const QuizSubmission = require('../Models/Result');
const Student = require('../Models/Student');
const Question = require('../Models/Questions');
const { notifyStudentOfStatusUpdate } = require('../Services/NotificationService');

const submitQuiz = async (req, res, quizType) => {
  try {
    console.log('Received data:', req.body);
    const { rollNumber, studentName, answers, interviewSlot } = req.body;
    
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        message: 'Invalid answers format. Expected an array of answer objects.'
      });
    }
    
    
    const modelName = quizType.toLowerCase();
    if (!Question[modelName]) {
      return res.status(400).json({ 
        message: `Invalid quiz model: ${quizType}`,
        success: false
      });
    }
    
    const questions = await Question[modelName].find({});
    
    if (!questions || questions.length === 0) {
      return res.status(400).json({ 
        message: `No questions found for quiz model: ${quizType}`,
        success: false
      });
    }
    
    console.log(`Found ${questions.length} questions for quiz model: ${quizType}`);
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
    
    const totalScore = scoreResult.score + 0; 
    const submission = new QuizSubmission({
      rollNumber,
      studentName: studentName,
      quizModel: quizType,
      answers,
      score: scoreResult.score,
      additionalMarks: 0, 
      totalScore: totalScore, 
      totalQuestions: scoreResult.totalQuestions,
      correctAnswers: scoreResult.correctAnswers,
    });
    
    await submission.save();
    
    res.status(201).json({
      success: true,
      message: 'Quiz submitted successfully',
      score: scoreResult.score,
      totalScore: totalScore,
      totalQuestions: scoreResult.totalQuestions,
      correctAnswers: scoreResult.correctAnswers.length,
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

const calculateScore = (answers, questions) => {
  let score = 0;
  let correctAnswers = [];
  const questionMap = {};
  questions.forEach(question => {
    const questionId = question._id.toString();
    questionMap[questionId] = question;
  });
  
  console.log("Question IDs in database:", Object.keys(questionMap));
  console.log("Answer Question IDs:", answers.map(a => a.questionId));
  for (const answer of answers) {
    const { questionId, selectedOption } = answer;
    const question = questionMap[questionId];
    if (!question) {
      console.warn(`Question not found for ID: ${questionId}`);
      continue;
    }
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
    if (selectedOption === correctOption) {
      const marks = question.marks || 1; 
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

const getAllSubmissions = async (req, res, quizModel) => {
  try {
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

const updateQualificationStatus = async (req, res, quizModel) => {
  try {
    const { submissionId } = req.params;
    const { qualifiedRound2, qualifiedRound3, recruited, additionalMarks, interviewSlot } = req.body;
    
    const submission = await QuizSubmission.findById(submissionId);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    if (submission.quizModel !== quizModel) {
      return res.status(400).json({ 
        message: `Submission does not belong to ${quizModel} quiz model`,
        success: false
      });
    }
    
    const statusChanged = 
      (qualifiedRound2 !== undefined && submission.qualifiedRound2 !== qualifiedRound2) ||
      (qualifiedRound3 !== undefined && submission.qualifiedRound3 !== qualifiedRound3) ||
      (recruited !== undefined && submission.recruited !== recruited);
      
    if (qualifiedRound2 !== undefined) submission.qualifiedRound2 = qualifiedRound2;
    if (qualifiedRound3 !== undefined) submission.qualifiedRound3 = qualifiedRound3;
    if (recruited !== undefined) submission.recruited = recruited;
    if (additionalMarks !== undefined) {
      submission.additionalMarks = parseFloat(additionalMarks) || 0;
      submission.totalScore = submission.score + submission.additionalMarks;
    }
    if (interviewSlot !== undefined) {
      // Ensure valid date or set to null if invalid
      try {
        submission.interviewSlot = interviewSlot ? new Date(interviewSlot) : null;
      } catch (e) {
        console.error("Invalid interview slot date:", interviewSlot);
        submission.interviewSlot = null;
      }
    }
    
    await submission.save();
    if (statusChanged && typeof notifyStudentOfStatusUpdate === 'function') {
      try {
        const notified = await notifyStudentOfStatusUpdate(submission);
        console.log(`Notification ${notified ? 'sent' : 'failed'} for student ${submission.rollNumber}`);
      } catch (notificationError) {
        console.error('Error sending notification:', notificationError);
      }
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