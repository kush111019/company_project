const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     description: Create a new course in the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the course
 *               description:
 *                 type: string
 *                 description: The description of the course
 *               duration:
 *                 type: integer
 *                 description: The duration of the course in hours
 *               instructorName:
 *                 type: string
 *                 description: The name of the course instructor
 *               language:
 *                 type: string
 *                 description: The language in which the course is taught
 *               level:
 *                 type: string
 *                 description: The difficulty level of the course (e.g., beginner, intermediate)
 *               price:
 *                 type: integer
 *                 description: The price of the course
 *               status:
 *                 type: string
 *                 description: The status of the course (e.g., published, unpublished)
 *               visibility:
 *                 type: string
 *                 description: The visibility of the course (e.g., public, private)
 *     responses:
 *       201:
 *         description: Successfully created the course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Bad request (invalid input)
 */
router.post('/api/courses', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Retrieve a list of all courses
 *     description: Get all courses from the system
 *     responses:
 *       200:
 *         description: A list of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       400:
 *         description: Bad request
 */
router.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get a specific course
 *     description: Retrieve details of a specific course by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the course to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the specific course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 *       400:
 *         description: Invalid ID format
 */
router.get('/api/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update a course
 *     description: Update an existing course by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the course to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: integer
 *               instructorName:
 *                 type: string
 *               language:
 *                 type: string
 *               level:
 *                 type: string
 *               price:
 *                 type: integer
 *               status:
 *                 type: string
 *               visibility:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated the course
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found
 *       400:
 *         description: Bad request
 */
router.put('/api/courses/:id', async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(updatedCourse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete a course
 *     description: Delete a course by its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the course to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the course
 *       404:
 *         description: Course not found
 *       400:
 *         description: Invalid ID format
 */
router.delete('/api/courses/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
