import express from 'express'
import { addUser, deleteUser, getUserByDNI, getUsers } from '../utils.js'

export const router = express.Router()

router.get('/', function (req, res) {
  const users = getUsers()
  res.send(users)
})

router.get('/:dni', function (req, res) {
  const { dni } = req.params
  const user = getUserByDNI(dni)

  if (user) res.send(user)
  else res.status(404).send(undefined)
})

router.post('/', function (req, res) {
  const user = req.body
  const result = addUser(user)

  if (!result) res.status(400).send({ cause: 'User already exists with this DNI' })
  else res.send(user)
})

router.delete('/:dni', function (req, res) {
  const { dni } = req.params
  deleteUser(dni)
  res.status(204).send('Deleted')
})

export default router
