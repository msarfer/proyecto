import { Button, Label, Modal, TextInput } from 'flowbite-react'
import { useState } from 'react'

export default function AddUser ({ onCreate }) {
  const [openModal, setOpenModal] = useState(false)
  const [dniColor, setDniColor] = useState()

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const form = evt.target
    const { name, surname, dni, password, role } = Object.fromEntries(new FormData(form))
    if (dni.length < 8) {
      setDniColor('bg-red-500')
      return
    }

    const user = {
      dni,
      name,
      surname,
      password,
      role
    }

    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status === 400) {
      setDniColor('bg-red-500')
    } else {
      handleClose()
      onCreate()
    }
  }

  const handleClose = () => {
    setOpenModal(false)
    setDniColor('')
  }

  return (
    <>
      <Button color='red' size='xs' className='rounded-none py-2 pt-3 border-none' onClick={() => setOpenModal(true)}>Añadir usuario</Button>
      <Modal show={openModal} size="md" onClose={handleClose} popup>
        <Modal.Header className='mx-4 mt-2'>Añadir Usuario</Modal.Header>
        <Modal.Body>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Nombre" />
              </div>
              <TextInput id="name" name='name' required/>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="surname" value="Apellidos" />
              </div>
              <TextInput id="surname" name='surname' required/>
            </div>
            <div>
              <div className={`mb-2 block py-1 ${dniColor}`}>
                <Label htmlFor="dni" value={!dniColor ? 'DNI' : 'DNI (El dni tiene que ser único y poseer 9 cifras)'}/>
              </div>
              <TextInput id="dni" name='dni' required/>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Contraseña" />
              </div>
              <TextInput id="password" name='password' required/>
            </div>
            <div>
              <label htmlFor="role" className="block mb-4 text-sm font-medium text-gray-900 dark:text-white">Seleccciona un rol</label>
              <select defaultValue='' name='role' id="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                <option value=''>Elige un rol</option>
                <option value='student'>Estudiante</option>
                <option value='lecturer'>Profesor</option>
                <option value='manager'>Gestor</option>
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
