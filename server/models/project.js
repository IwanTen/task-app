const { default: mongoose } = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide a project name"],
    trim: true,
    maxlength: [20, "project name can not be more than 20 characters"],
  },
});

module.exports = new mongoose.model("Project", ProjectSchema);
