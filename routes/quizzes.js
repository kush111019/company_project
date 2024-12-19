const express = require('express');
const Quiz = require('../models/Quiz');
const Course = require('../models/Course');
const router = express.Router();

/**
 * @swagger
 * /api/courses/{courseId}/quizzes:
 *   post:
 *     summary: Create a quiz for a specific course
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course to create the quiz for
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: The question for the quiz
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of options for the quiz question
 *               correctAnswer:
 *                 type: string
 *                 description: The correct answer for the quiz question
 *     responses:
 *       201:
 *         description: Quiz created successfully
 *       404:
 *         description: Course not found
 *       400:
 *         description: Bad request
 */
router.post('/api/courses/:courseId/quizzes', async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const quiz = new Quiz({ ...req.body, courseId: req.params.courseId });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/courses/{courseId}/quizzes:
 *   get:
 *     summary: Get all quizzes for a specific course
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: ID of the course to fetch quizzes for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of quizzes for the course
 *       404:
 *         description: Course not found
 *       400:
 *         description: Bad request
 */
router.get('/api/courses/:courseId/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find({ courseId: req.params.courseId });
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/quizzes/{id}:
 *   get:
 *     summary: Get a specific quiz by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the quiz to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz data
 *       404:
 *         description: Quiz not found
 *       400:
 *         description: Bad request
 */
router.get('/api/quizzes/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/quizzes/{id}:
 *   put:
 *     summary: Update a specific quiz by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the quiz to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: The updated question for the quiz
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Updated array of options
 *               correctAnswer:
 *                 type: string
 *                 description: The updated correct answer for the quiz question
 *     responses:
 *       200:
 *         description: Quiz updated successfully
 *       404:
 *         description: Quiz not found
 *       400:
 *         description: Bad request
 */
router.put('/api/quizzes/:id', async (req, res) => {
  const quizId = req.params.id;
  const updatedQuiz = req.body;

  try {
    const quiz = await Quiz.findByIdAndUpdate(quizId, updatedQuiz, {
      new: true,
      runValidators: true
    });

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    return res.json(quiz);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/quizzes/{id}:
 *   delete:
 *     summary: Delete a specific quiz by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the quiz to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz deleted successfully
 *       404:
 *         description: Quiz not found
 *       400:
 *         description: Bad request
 */
router.delete('/api/quizzes/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json({ message: 'Quiz deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
