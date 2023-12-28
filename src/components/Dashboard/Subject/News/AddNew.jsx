import { Button, Label, Modal, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { useStateStore } from '../../../../store'

export default function AddNew ({ subjectId, onCreate }) {
  const [openModal, setOpenModal] = useState(false)
  const user = useStateStore((state) => state.user)

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const form = evt.target
    const { title, content } = Object.fromEntries(new FormData(form))
    const date = Date.now()

    const news = {
      id: crypto.randomUUID(),
      title,
      content,
      author: user.dni,
      created: date
    }

    await fetch(`http://localhost:8080/subjects/${subjectId}/news`, {
      method: 'POST',
      body: JSON.stringify(news),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setOpenModal(false)
    onCreate()
  }

  return (
    <>
      <Button color='red' size='xs' className='rounded-none py-2 pt-3 border-none' onClick={() => setOpenModal(true)}>Añadir noticia</Button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Añadir noticia</h3>
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
                <Label htmlFor="content" value="Contenido" />
              </div>
              <TextInput id="content" name='content' type="text" required />
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
