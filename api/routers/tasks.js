import express from 'express'
import { addTask, deleteTask, getTasks, getTasksById } from '../utils.js'

export const router = express.Router()

router.get('/', function (req, res) {
  res.send(getTasks())
})

router.get('/:id', function (req, res) {
  const { id } = req.params
  console.log('Params: ' + id)
  res.send(getTasksById(id))
})

router.post('/', function (req, res) {
  const task = req.body
  console.log('add subject ' + JSON.stringify(task))
  const result = addTask(task)

  if (!result) res.status(400).send({ cause: 'Task already exists with this DNI' })
  else res.send(task)
})

router.delete('/:id', function (req, res) {
  const { id } = req.params
  console.log('delete task' + id)
  deleteTask(id)
  res.status(204).send('Deleted')
})

export default router
