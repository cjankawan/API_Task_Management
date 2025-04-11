
// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: [true, "description is required"],
      trim: true
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
