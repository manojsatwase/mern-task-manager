const Task = require('../models/taskModel');
const asyncHandler = require('express-async-handler');

// get request
const getTasks = asyncHandler(async (req, res) => {
  try {
    // Find notes belonging to the user with req.user._id
    const tasks = await Task.find({ user: req.user._id });
   if (!tasks || tasks?.length === 0) {
    return res.status(200).json([]); // Return an empty array if no tasks are found
  }
    res.status(200).json(tasks); // Changed status code to 200 for success
  } catch (error) {
    res.status(404);
    throw new Error('Error occurred while fetching notes');
  }
});

// post request
const createTask = asyncHandler(async(req, res) => {
  const { title, content, category, status,priority, dueDate } = req.body;
  
  // Check if any required field is missing
  if (!title || !content || !category || !status || !priority || !dueDate) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    try {
      // Create a new Task using the create method
      const createdTask = await Task.create({
        user: req.user._id,
        title,
        content,
        category,
        status,
        priority,
        dueDate
      });
      res.status(201).json(createdTask);
    } catch (error) {
      res.status(500);
      throw new Error("Failed to create note");
    }
  }
});


// post create single task
const getSingleTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (task) {
    res.json(task); // Send the found Task as response
  } else {
    res.status(404).json({
      message: "Note not found"
    });
  }
});

// get update Task

const updateTask = asyncHandler(async (req, res) => {
  const {title,content,category,status,priority,dueDate,date} = req.body;

  // Update the note directly in the database and get the updated document
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    {title,content,category,status,priority,dueDate,date},
    {new: true, runValidators: true } // To return the updated document and run validators
  );
  // Check if the note exists and the user owns it
  if (!updatedTask || updatedTask.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action or note not found");
  }

  // Send the updated note as response
  res.json(updatedTask);
});


// delete request detele note

const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the note by ID and check if the current user owns it
  const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });

  // If note is not found or user doesn't own it, throw error
  if (!task) {
    res.status(404);
    throw new Error("Note not found or you don't have permission to delete it");
  }

  // Send success response
  res.json({ message: "Note deleted successfully" });
});


module.exports = {
    getTasks,
    createTask,
    getSingleTaskById,
    updateTask,
    deleteTask
}


