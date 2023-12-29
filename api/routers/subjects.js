import express from 'express'
import { addSubject, deleteSubject, getSubjects, getSubjectById, addNews, addGrade, joinMember } from '../utils.js'

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

router.post('/', function (req, res) {
  const subject = req.body
  console.log('add subject ' + JSON.stringify(subject))
  const result = addSubject(subject)

  if (!result) res.status(400).send({ cause: 'Subject already exists with this ID' })
  else res.send(subject)
})

router.delete('/:id', function (req, res) {
  const { id } = req.params
  console.log('delete subject ' + id)
  deleteSubject(id)
  return res.status(204).send('Deleted')
})

router.post('/:id/members', function (req, res) {
  const { id } = req.params
  const { dni } = req.body
  console.log('join member ' + dni)
  const result = joinMember(id, dni)

  if (!result) res.status(400).send({ cause: 'This user already exists in this subject' })
  else res.send(result)
})

router.post('/:id/news', function (req, res) {
  const { id } = req.params
  const news = req.body
  console.log('add new ' + JSON.stringify(news))
  const result = addNews(id, news)
  console.log(result)
  if (!result) res.status(400).send({ cause: 'News already exists with this ID' })
  else res.send(news)
})

router.post('/:id/grades', function (req, res) {
  const { id } = req.params
  const news = req.body
  console.log('add grade ' + JSON.stringify(news))
  const result = addGrade(id, news)
  console.log(result)
  if (!result) res.status(400).send({ cause: 'Grade already exists with this ID' })
  else res.send(news)
})

export default router
