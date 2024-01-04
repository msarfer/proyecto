import cors from 'cors'
import express from 'express'

// ROUTERS
import subjects from './routers/subjects.js'
import users from './routers/users.js'

const PORT = process.env.PORT ?? 8080

const app = express()
app.use(express.json())
app.use(cors({ origin: '*' }))

app.use('/users', users)
app.use('/subjects', subjects)

app.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`)
})
