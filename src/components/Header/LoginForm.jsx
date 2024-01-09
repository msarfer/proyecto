import { Button, Label, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { useStateStore } from '../../store'

export default function Form () {
  const [role, setRole] = useState('student')
  const [location, setLocation] = useLocation()

  const user = useStateStore(state => state.user)
  const setUser = useStateStore(state => state.setUser)

  useEffect(() => {
    if (user) setLocation('/dashboard')
  }, [user])

  const getColor = (r) => role === r ? 'red' : 'gray'

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const form = evt.target
    const { dni, password } = Object.fromEntries(new FormData(form))

    const fetchUser = await fetch(`http://localhost:8080/users/${dni}`)
      .then(res => res.status === 200 ? res.json() : undefined)

    if (!fetchUser || fetchUser.password !== password || fetchUser.role !== role) alert('No se ha encontrado un usuario con la información proporcionada')
    else {
      delete fetchUser.password
      setUser(fetchUser)
      setLocation('/dashboard')
    }
  }

  return (
    <div className="h-full w-full grid place-items-center items-center">
      <form className="flex flex-col gap-5 px-16 w-full" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="dni" value="DNI"/>
          </div>
          <TextInput
            id='dni'
            name='dni'
            type="text"
            placeholder='Use su número de identificación sin letra.'
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Contraseña" />
          </div>
          <TextInput id='password' type="password" name='password' required />
        </div>
        <Button.Group className="w-full">
          <Button className='w-full border dark:text-white' color={getColor('student')} onClick={() => setRole('student')}>Estudiante</Button>
          <Button className='w-full border dark:text-white' color={getColor('lecturer')} onClick={() => setRole('lecturer')}>Profesor</Button>
          <Button className='w-full border dark:text-white' color={getColor('manager')} onClick={() => setRole('manager')}>Gestor</Button>
        </Button.Group>
        <Button type="submit" color='red'>Entrar</Button>
      </form>
    </div>
  )
}
