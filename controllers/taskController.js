const Task = require("../models/Task");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

exports.createTask = asyncHandler(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(new ApiResponse(201, "Task created", task));
});

exports.getTasks = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    order = "desc",
    status,
  } = req.query;

  const filter = status ? { status } : {};
  const sortOrder = order === "asc" ? 1 : -1;

  const tasks = await Task.find(filter)
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(new ApiResponse(200, "Tasks retrieved", tasks));
});

exports.getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) throw new ApiError(404, "Task not found");
  res.json(new ApiResponse(200, "Task found", task));
});

exports.updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!task) throw new ApiError(404, "Task not found");
  res.json(new ApiResponse(200, "Task updated", task));
});

exports.updateTaskStatus = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true },
  );
  if (!task) throw new ApiError(404, "Task not found");
  res.json(new ApiResponse(200, "Task status updated", task));
});

exports.deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) throw new ApiError(404, "Task not found");
  res.json(new ApiResponse(200, "Task deleted"));
});
