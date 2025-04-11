
// console.log("Hello there");

const express = require('express');
const { default: mongoose } = require('mongoose');
const Task = require('./models/tasks.model.js');

const app = express()
app.use(express.json());


// app.listen(3000)
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


mongoose.connect("mongodb+srv://cjankawan:ar7FNGNV4h07l7rE@task.ixrxlav.mongodb.net/node_task_api?retryWrites=true&w=majority&appName=task")
.then(() => console.log("mongoDB connected"))
.catch(() => console.log("Connection FAIL mongoDB"));



const { taskSchema } = require('./JioValidations/jio.task.validation.js');
const validateRequest = require('./middlewares/validateRequest');
const validateObjectId = require('./middlewares/validateObjectId');

app.post('/api/tasks', validateRequest(taskSchema), async (req, res) => {
    try {
      const { title, description, status } = req.body;
  
      const newTask = new Task({ title, description, status });
      const savedTask = await newTask.save();
  
      res.status(201).json(savedTask);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

app.get('/api/tasks', async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Sorting
    const sortBy = req.query.sortBy || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;

    // Filtering
    const statusFilter = req.query.status ? { status: req.query.status } : {};
    // const createdAtFilter = req.query.createdAt ? { createdAt: new Date(req.query.createdAt) } : {};
    let createdAtFilter = {};
    if (req.query.createdAt) {
    const day = new Date(req.query.createdAt);

    // Check if the date is valid
    if (!isNaN(day.getTime())) {
        const nextDay = new Date(day);
        nextDay.setDate(day.getDate() + 1);

        createdAtFilter = {
        createdAt: {
            $gte: day,
            $lt: nextDay
        }
        };
    } else {
        return res.status(400).json({ error: 'Invalid createdAt date format' });
    }
    }

    const filter = { ...statusFilter, ...createdAtFilter };

    // Fetch tasks
    const tasks = await Task.find(filter)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit);

    // Count total for pagination
    const total = await Task.countDocuments(filter);

    res.json({
      total,
      page,
      limit,
      tasks
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/tasks/:id', validateObjectId, async (req, res) => {

    try {
      const { id } = req.params;
  
      const task = await Task.findById(id);
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.put('/api/tasks/:id', validateObjectId, validateRequest(taskSchema), async (req, res) => {

    try {
      const { id } = req.params;
      const { title, description, status } = req.body;
  
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { title, description, status },
        { new: true, runValidators: true }
      );
  
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.json(updatedTask);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

app.delete('/api/tasks/:id', validateObjectId, async (req, res) => {

    try {
      const { id } = req.params;
  
      const deletedTask = await Task.findByIdAndDelete(id);
  
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.json({ message: 'Task deleted successfully', task: deletedTask });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

app.patch('/api/tasks/:id/status', validateObjectId, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const validStatuses = ['pending', 'in-progress', 'completed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
      }
  
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );
  
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.json(updatedTask);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

