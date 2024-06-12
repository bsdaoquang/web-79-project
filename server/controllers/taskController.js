import TaskModel from '../models/TaskModel.js';
import {tasks} from '../data/tasks.js';

const addNewTask = async (req, res) => {
  const {content} = req.body

  if (!content) {
    throw new Error('Missing content')  
  }

  const newTask = new TaskModel({
    content
  })

  await newTask.save()

  res.status(200).json({
    message: 'Create new taks successfully!!!',
    data: newTask
  })
}

const getTasks = async(req, res) => {

  res.status(200).json({
    message: 'Tasks',
    data: req.rule !== 0 ? []: tasks
  })
}

const updateTask = async(req, res) => {
  const {id} = req.query
  const {content} = req.body 

  await TaskModel.findByIdAndUpdate(id, {content})
  res.status(203).json({
    message: 'Updated',
    data: []
  })
}

const deleteTask = async(req, res) => {
  try {
    const {id} = req.query

  const item = await TaskModel.findById(id)

  if (!item) {
    throw new Error('Task not found')
  }

  const createdBy = item.createdBy

  if (createdBy !== req.uid) {
    throw new Error('This not your task')
  }

  await TaskModel.findByIdAndDelete(id)

  res.status(205).json({
    message: 'Removed',
    data: []
  })
  } catch (error) {
    res.status(404).json({
      message: error.message,
    })
  }
  
}

const getTaskDetail = async (req, res) => {
  const {id} = req.params 
  try {
    const item = tasks.find(element => `${element.id}` === id)

    if (!item) {
      throw  new Error('Task not found')
    }

    res.status(200).json({
      message: "Task detail",
      data: item
    })
  } catch (error) {
    console.log(error)
    res.status(404).json({
      message: error.message,
      data: []
    })
  }
}

export {
  addNewTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskDetail
}