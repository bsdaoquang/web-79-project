import TaskModel from '../models/TaskModel.js';

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
  const tasks = await TaskModel.find()

  res.status(200).json({
    message: 'Tasks',
    data: tasks
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
  const {id} = req.query

  await TaskModel.findByIdAndDelete(id)

  res.status(205).json({
    message: 'Removed',
    data: []
  })
}

export {
  addNewTask,
  getTasks,
  updateTask,
  deleteTask
}