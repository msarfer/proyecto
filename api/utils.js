import fs from 'node:fs'

const USERS_PATH = './db/users.json'
const SUBJECTS_PATH = './db/subjects.json'

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
  const users = getUsers()
  const user = users.find(u => u.dni === us.dni)

  if (!user) {
    users.push(us)
    storeUsers(users)
    return us
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
  if (subject === undefined) {
    subjects.push(sub)
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

export function joinMember (id, dni) {
  const subjects = getSubjects()
  const subject = subjects.find(s => s.id === id)

  if (subject !== undefined) {
    const members = subject.members
    if (!members.includes(dni)) {
      const subIdx = subjects.findIndex(s => s.id === id)
      members.push(dni)
      subjects[subIdx].members = members
      storeSubjects(subjects)
      return dni
    }
    return null
  }
  return null
}

export function addGrade (id, grade) {
  const subjects = getSubjects()
  const subject = subjects.find(s => s.id === id)

  if (subject !== undefined) {
    const subIdx = subjects.findIndex(s => s.id === id)
    let grades = subject.grades

    const oldGrade = grades.find(g => g.student === grade.student && g.title === grade.title)

    let newGrade = {}
    if (oldGrade) {
      newGrade = { ...oldGrade, id: grade.id, grade: grade.grade }
      grades = grades.filter(grade => grade.id !== oldGrade.id)
    } else {
      newGrade = grade
    }

    grades.push(newGrade)
    subjects[subIdx].grades = grades
    console.log(grades)
    storeSubjects(subjects)
    return newGrade
  }
  return null
}

export function storeSubjects (subjects) {
  const str = JSON.stringify(subjects)
  fs.writeFileSync(SUBJECTS_PATH, str)
}

export function deleteSubject (id) {
  const data = getSubjects()
  const subjects = data.filter(s => s.id !== id)

  storeSubjects(subjects)
}
