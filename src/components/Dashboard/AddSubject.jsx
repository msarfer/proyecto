import { Button, Label, Modal, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useStateStore } from '../../store'

export default function AddSubject ({ onCreate }) {
  const [openModal, setOpenModal] = useState(false)
  const [lecturers, setLecturers] = useState([])
  useEffect(() => {
    const getLecturer = async () => {
      const fetchedLecturers = await fetch('http://localhost:8080/users').then(res => res.status === 200 ? res.json() : undefined)
      const result = fetchedLecturers.filter(user => user.role === 'lecturer')
      setLecturers(result)
    }

    getLecturer()
  }, [])

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const form = evt.target
    const { name, lecturer } = Object.fromEntries(new FormData(form))

    const subject = {
      id: crypto.randomUUID(),
      name,
      head: lecturer,
      members: [],
      news: [],
      grades: [],
      resources: []
    }
    console.log(subject)

    await fetch('http://localhost:8080/subjects', {
      method: 'POST',
      body: JSON.stringify(subject),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setOpenModal(false)
    onCreate()
  }

  return (
    <>
      <Button color='red' size='xs' className='rounded-none py-2 pt-3 border-none' onClick={() => setOpenModal(true)}>Añadir asignatura</Button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Añadir Asignatura</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Nombre de la asignatura" />
              </div>
              <TextInput id="name" name='name' required/>
            </div>
            <div>
              <label htmlFor="lecturer" className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">Seleccciona a un usuario</label>
              <select defaultValue='' name='lecturer' id="lecturer" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                <option value=''>Elige a un profesor</option>
                {lecturers?.map(lecturer => {
                  if (!lecturer) return null
                  return (<option key={lecturer.dni} value={lecturer.dni}>{lecturer.name} {lecturer.surname}</option>)
                })
                }
              </select>
            </div>

            <div className="w-full">
              <Button type='submit' color='red'>Añadir</Button>
            </div>

          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
