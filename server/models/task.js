const mongoose = require("mongoose");

const TaskStepSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "a step must have text content"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [20, "name can not be more than 20 characters"],
  },
  info: {
    type: String,
    required: [false],
    trim: true,
    maxlength: [500, "description can not be longer than 500 characters"],
  },
  steps: [
    new mongoose.Schema({
      step: {
        type: String,
        required: [true, "a step must have text content"],
      },
      completed: {
        type: Boolean,
        default: false,
      },
    }),
  ],
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
