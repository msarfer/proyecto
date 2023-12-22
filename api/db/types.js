export const Student = {
  dni: '20097446',
  name: 'Marco',
  surname: 'Sarrio Ferrández',
  password: '1234',
  role: 'student'
}

export const Lecturer = {
  dni: '20097445',
  name: 'Víctor',
  surname: 'Sarrio Ferrández',
  password: '1234',
  role: 'lecturer'
}

export const Manager = {
  dni: 20097444,
  name: 'Sergio',
  surname: 'Sarrio Ferrández',
  password: '1234',
  role: 'manager'
}

export const Subject = {
  id: '36b8f84d-df4e-4d49-b662-bcde71a8764f',
  name: 'Programación',
  head: '', // Lecturer dni
  members: [], // DNI Array
  resources: [], // Resources Array
  tasks: [] // Tasks Array
}
