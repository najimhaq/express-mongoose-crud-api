//!routes/useRoutes.js
const express = require('express');
const {
  getAllTodos,
  getSingleTodo,
  createATodo,
  createAllTodo,
  updateTodo,
  deleteTodo,
} = require('../controller/useControllers');

const router = express.Router();

//*Get All Todos
router.get('/api/todos', getAllTodos);
router.get('/api/todos/:id', getSingleTodo);
router.post('/api/todos', createATodo);
router.post('/api/todos/all', createAllTodo);
router.put('/api/todos/:id', updateTodo);
router.delete('/api/todos/:id', deleteTodo);

// router
// .route('/api/todos')
// .get(getAllTodos)
// .post(createTodo);

// router
//   .route('/api/todos/:id')
//   .get(getSingleTodo)
//   .put(updateTodo)
//   .delete(deleteTodo);

module.exports = router;
