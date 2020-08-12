const Joi = require("joi");
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollId: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
  },
});
const taskScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  students: {
    type: [studentSchema],
  },
});

const Task = mongoose.model("Task", taskScheme);

module.exports.Task = Task;
