const mongoose = require("mongoose");

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
  completed: {
    type: Boolean,
    default: false,
  },
});

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide a project name"],
    trim: true,
    maxlength: [20, "project name can not be more than 20 characters"],
  },
});

module.exports = mongoose.model("Task", TaskSchema);
