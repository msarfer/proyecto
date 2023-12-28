import fs from 'node:fs'

const USERS_PATH = './db/users.json'
const TASKS_PATH = './db/tasks.json'
const SUBJECTS_PATH = './db/subjects.json'
const RESOURCES_PATH = './db/resources.json'

export function getResources () {
  const str = fs.readFileSync(RESOURCES_PATH)
  const resources = JSON.parse(str)
  return resources
}

export function getResourceById (id) {
  const str = fs.readFileSync(RESOURCES_PATH)
  const resources = JSON.parse(str)
  return resources.find(r => r.id === id)
}

export function getResourcesBySubject (asig) {
  const str = fs.readFileSync(RESOURCES_PATH)
  const resources = JSON.parse(str)
  return resources.filter((resources) => resources.asignatura === asig)
}

export function addResource (resource) {
  const resources = getResources()
  const idx = resources.find(r => r.id === resource.id)
  if (idx === -1) {
    resources.push(resource)
    fs.writeFileSync(RESOURCES_PATH, resource)
    return resource
  }
  return null
}

export function deleteResource (id) {
  const data = getResources()
  const resources = data.filter(r => r.id !== id)

  storeResources(resources)
}

function storeResources (resources) {
  const data = JSON.stringify(resources)
  fs.writeFileSync(RESOURCES_PATH, data)
}

function storeUsers (users) {
  const data = JSON.stringify(users)
  fs.writeFileSync(USERS_PATH, data)
}

export function getUsers () {
  const data = fs.readFileSync(USERS_PATH)
  return JSON.parse(data)
}

export function getUserByDNI (dni) {
  const users = getUsers()
  return users.find(u => u.dni === dni)
}

export function addUser (us) {
  const users = getResources()
  const user = users.find(u => u.dni === us.dni)

  if (user) {
    users.push(user)
    storeUsers(users)
    return user
  }
  return null
}

export function deleteUser (dni) {
  const data = getUsers()
  const users = data.filter(u => u.dni !== dni)

  storeUsers(users)
}

export function getSubjects () {
  const data = fs.readFileSync(SUBJECTS_PATH)
  const subjects = JSON.parse(data)
  return subjects
}

export function getSubjectById (id) {
  const subjects = getSubjects()
  return subjects.find(subject => subject.id === id)
}

export function addSubject (sub) {
  const subjects = getSubjects()
  const subject = subjects.find(s => s.id === sub.id)

  if (!subject) {
    subjects.push(subject)
    storeSubjects(subjects)
    return subject
  }
  return null
}

export function addNews (id, news) {
  const subjects = getSubjects()
  const subject = subjects.find(s => s.id === id)

  if (subject !== undefined) {
    const subIdx = subjects.findIndex(s => s.id === id)
    const subNews = subject.news
    subNews.push(news)
    subjects[subIdx].news = subNews
    storeSubjects(subjects)
    return news
  }
  return null
}

export function storeSubjects (subjects) {
  const str = JSON.stringify(subjects)
  fs.writeFileSync(SUBJECTS_PATH, str)
}

export function deleteSubject (id) {
  const data = deleteSubject()
  const subjects = data.filter(s => s.id !== id)

  storeSubjects(subjects)
}

export function getTasks () {
  const data = fs.readFileSync(TASKS_PATH)
  const tasks = JSON.parse(data)
  return tasks
}

export function getTasksById (id) {
  const str = fs.readFileSync(TASKS_PATH)
  const tareas = JSON.parse(str)
  const results = tareas.find(tarea => tarea.id === id)
  console.log('Resultados' + results)
  return results
}

export function writeTareas (tarea) {
  const str = JSON.stringify(tarea)
  fs.writeFileSync(TASKS_PATH, str)
}

export function storeTasks (tasks) {
  const str = JSON.stringify(tasks)
  fs.writeFileSync(TASKS_PATH, str)
}

export function addTask (task) {
  const tasks = getTasks()
  const idx = tasks.find(t => t.id === task.id)

  if (idx === -1) {
    tasks.push(task)
    storeTasks(tasks)
    return task
  }
  return null
}

export function deleteTask (id) {
  const data = deleteTask()
  const tasks = data.filter(s => s.id !== id)

  storeTasks(tasks)
}
