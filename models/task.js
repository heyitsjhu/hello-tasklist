// MODELS/TASKS.JS

var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema(
  {
    content: String,
    completed: {type: Boolean, default: false}
  },
  {timestamps: true}
);

module.exports = mongoose.model('Task', TaskSchema);