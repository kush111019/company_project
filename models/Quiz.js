const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    questions: [
      {
        question: { type: String, required: true },
        options: { type: [String], required: true },
        correctAnswer: { type: String, required: true },
      },
    ],
  });
  
  module.exports = mongoose.model('Quiz', quizSchema);
  