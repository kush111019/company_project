const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const coursesRoutes = require('./routes/courses');
const quizzesRoutes = require('./routes/quizzes');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Use JSON parser for incoming requests
app.use(express.json());

// Enable CORS for all routes (optional)
app.use(cors());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Education Platform API',
      version: '1.0.0',
      description: 'API for managing courses and quizzes in an educational platform',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Replace with your actual server URL
      },
    ],
    components: {
      schemas: {
        Course: {
          type: 'object',
          required: ['title', 'description', 'duration', 'instructorName', 'language', 'level'],
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            duration: { type: 'integer' },
            instructorName: { type: 'string' },
            language: { type: 'string' },
            level: { type: 'string' },
            price: { type: 'integer' },
            status: { type: 'string' },
            visibility: { type: 'string' },
          },
        },
        Quiz: {
          type: 'object',
          required: ['question', 'options', 'correctAnswer'],
          properties: {
            question: { type: 'string' },
            options: {
              type: 'array',
              items: { type: 'string' },
            },
            correctAnswer: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./routes/courses.js', './routes/quizzes.js'], // Point to your route files for Swagger to parse
};

// Initialize Swagger with the options
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// MongoDB connection (replace with your MongoDB URI)
mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));

// Use routes
app.use('/api/courses', coursesRoutes); // Course routes
app.use('/api/quizzes', quizzesRoutes); // Quiz routes

// Root endpoint (optional)
app.get('/', (req, res) => {
  res.send('Welcome to the Education Platform API');
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
