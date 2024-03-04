const express = require('express');
const { getTasks, createTask, getSingleTaskById, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();
// passing thorugh this protect routes
router.route('/').get(protect,getTasks)
router.route('/create').post(protect,createTask);
// get the perticular note then updated the note and then delete then note
router.route('/:id').get(protect,getSingleTaskById).put(protect,updateTask).delete(protect,deleteTask)

module.exports = router;