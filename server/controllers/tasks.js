const Task = require("../models/task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return res.status(404).json({ message: `no task with id : ${taskID}` });
    }
    return res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({ message: `no task with id : ${taskID}` });
    }
    return res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: TaskID } = req.params;

    // res.status(200).json({ id: TaskID, data: req.body });

    const task = await Task.findOneAndUpdate({ _id: TaskID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ message: `no task with id : ${TaskID}` });
    }
    return res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
