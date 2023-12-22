import express from 'express'
import { addSubject, deleteSubject, getSubjects, getSubjectById } from '../utils.js'

export const router = express.Router()

router.get('/', function (req, res) {
  res.send(getSubjects())
})

router.get('/:id', function (req, res) {
  const { id } = req.params
  const subject = getSubjectById(id)

  if (subject) res.send(subject)
  else res.status(404).send(undefined)
})

router.post('/subjects', function (req, res) {
  const subject = req.body
  console.log('add subject ' + JSON.stringify(subject))
  const result = addSubject(subject)

  if (!result) res.status(400).send({ cause: 'Subject already exists with this DNI' })
  else res.send(subject)
})

router.delete('/subjects/:id', function (req, res) {
  const { id } = req.params
  console.log('delete subject' + id)
  deleteSubject(id)
  res.status(204).send('Deleted')
})

export default router
