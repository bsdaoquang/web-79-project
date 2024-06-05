import { Router } from "express";
import { addNewTask, deleteTask, getTasks, updateTask } from "../controllers/taskController.js";
import logger from "../middlewares/logger.js";
import verifyToken from "../middlewares/verifyToken.js";

const taskRouter = Router()

taskRouter.use(verifyToken)

taskRouter.post('/add-new-task', addNewTask)
taskRouter.get('/get-tasks',getTasks)
taskRouter.put('/update-task', updateTask)
taskRouter.delete('/remove-task', deleteTask)

export default taskRouter