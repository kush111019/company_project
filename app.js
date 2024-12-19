const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const courseRoutes = require('./routes/courses');
const quizRoutes = require('./routes/quizzes');

// Initialize the app
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) if needed

// MongoDB connection setup
const DB_URI = 'mongodb://localhost:27017/edu-platform';  // Update with your actual DB URI
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Education Platform API',
      version: '1.0.0',
      description: 'API for managing courses and quizzes in an educational platform',
    },
  },
  apis: ['./routes/*.js'],  // Include route files to auto-generate Swagger documentation
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Use Swagger UI to display the API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api', courseRoutes);  // Course routes
app.use('/api', quizRoutes);    // Quiz routes

// Default route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the Educational Platform API!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
