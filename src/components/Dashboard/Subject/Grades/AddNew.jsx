import { Button, Label, Modal, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useStateStore } from '../../../../store'
import { useSubject } from '../../../../hooks/useSubject'

export default function AddNew ({ subjectId, onCreate }) {
  const [openModal, setOpenModal] = useState(false)
  const user = useStateStore((state) => state.user)
  const { subject } = useSubject(subjectId)
  const [members, setMembers] = useState([])

  useEffect(() => {
    if (!subject.id) return
    const getMembers = async () => {
      const fecthedMembers = await Promise.all(subject.members.map(async dni => await fetch(`http://localhost:8080/users/${dni}`).then(res => res.status === 200 ? res.json() : undefined)))
      setMembers(fecthedMembers)
    }

    getMembers()
  }, [subject])

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const form = evt.target
    const { title, grade, students } = Object.fromEntries(new FormData(form))
    const date = Date.now()

    const newGrade = {
      id: crypto.randomUUID(),
      title,
      grade,
      student: students,
      created: date
    }

    console.log(newGrade)
    await fetch(`http://localhost:8080/subjects/${subjectId}/grades`, {
      method: 'POST',
      body: JSON.stringify(newGrade),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setOpenModal(false)
    onCreate()
  }

  return (
    <>
      <Button color='red' size='xs' className='rounded-none py-2 pt-3 border-none' onClick={() => setOpenModal(true)}>Añadir Nota</Button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Añadir nota</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Título" />
              </div>
              <TextInput
                id="title"
                name='title'
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="grade" value="Nota" />
              </div>
              <TextInput id="grade" name='grade' type="number" min='0' max='10' step='0.1' required />
            </div>
            <div>
              <label htmlFor="students" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccciona a un usuario</label>
              <select defaultValue='' name='students' id="students" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value=''>Elige a un alumno</option>
                {members?.map(member => {
                  if (!member) return null
                  return (<option key={member.dni} value={member.dni}>{member.name} {member.surname}</option>)
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
