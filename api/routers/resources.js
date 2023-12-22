import express from 'express'
import { addResource, deleteResource, getResources, getResourcesBySubject } from '../utils.js'

export const router = express.Router()

router.get('/', (req, res) => {
  res.send(getResources())
})

router.get('/:asig', function (req, res) {
  const { asig } = req.params
  console.log('Params: ' + asig)
  res.send(getResourcesBySubject(asig))
})

router.post('/', function (req, res) {
  const resource = req.body
  console.log('add resource ' + JSON.stringify(resource))
  const result = addResource(resource)

  if (!result) res.status(400).send({ cause: 'Resource already exists with this DNI' })
  else res.send(resource)
})

router.delete('/:id', function (req, res) {
  const { id } = req.params
  console.log('delete resources' + JSON.stringify(id))
  deleteResource(id)
  res.status(204).send('Deleted')
})

export default router
