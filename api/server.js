import cors from 'cors'
import express from 'express'

// ROUTERS
import resources from './routers/resources.js'
import subjects from './routers/subjects.js'
import users from './routers/users.js'
import tasks from './routers/tasks.js'

const PORT = process.env.PORT ?? 8080

const app = express()
app.use(express.json())
app.use(cors({ origin: '*' }))

app.use('/resources', resources)
app.use('/users', users)
app.use('/subjects', subjects)
app.use('/tasks', tasks)

app.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`)
})
