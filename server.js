const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB (Local)
mongoose.connect('mongodb://localhost:27017/taskdb');

// Create a simple Data Schema
const Task = mongoose.model('Task', { name: String });

// Route to get tasks
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Route to add a task
app.post('/tasks', async (req, res) => {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
});

app.listen(5000, () => console.log("Server running on port 5000"));