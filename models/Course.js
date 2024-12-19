const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  instructorName: { type: String, required: true },
  language: { type: String, required: true },
  level: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['published', 'draft'], required: true },
  visibility: { type: String, enum: ['public', 'private'], required: true },
  chapters: [
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
      description: { type: String, required: true },
      videoLink: { type: String, required: false },
      duration: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model('Course', courseSchema);
