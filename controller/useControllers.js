//controllers/useControllers.js
const asyncHandler = require('../middleware/asyncHandler');
const Todo = require('../models/todoSchemas');

// !get all todos - get
const getAllTodos = asyncHandler(async (req, res) => {
  try {
    const todos = await Todo.find()
    // .select({
    //   _id: 0,
    //   date: 0,
    //   createdAt: 0,
    //   updatedAt: 0,
    // });
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
});

//!get a single todo with :id
const getSingleTodo = asyncHandler(async (req, res) => {
  try {
    const todos = await Todo.find({_id:req.params.id})
    // .select({
    //   _id: 0,
    //   date: 0,
    //   createdAt: 0,
    //   updatedAt: 0,
    // });
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
});

//!create a single todo - /:id/Post
const createATodo = asyncHandler(async (req, res) => {
  try {
    const newTodo = Todo(req.body);
    await newTodo.save();
    res.status(201).json({
      success: true,
      message: 'Todo Create Successfully',
      data: newTodo,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages,
      });
    }
  }
});

//!create many todos - Post
const createAllTodo = asyncHandler(async (req, res) => {
  try {
    await Todo.insertMany(req.body);
    res.status(201).json({
      success: true,
      message: 'Todos were inserted successfully',
      data: Todo,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages,
      });
    }
  }
});

//!Update todo - put method
const updateTodo = asyncHandler(async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }

    res.status(201).json({
      success: true,
      message: 'Todo update successfully',
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
});

//!delete todo - Delete
const deleteTodo = asyncHandler(async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully',
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
});

module.exports = {
  getAllTodos,
  getSingleTodo,
  createATodo,
  createAllTodo,
  updateTodo,
  deleteTodo,
};
