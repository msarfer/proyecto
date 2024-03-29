import { Dropdown } from 'flowbite-react'
import { useLocation } from 'wouter'
import { useStateStore } from '../../store'

export default function Badge ({ subject, selectedId }) {
  const [location, setLocation] = useLocation()
  const user = useStateStore((state) => state.user)

  const { name, id } = subject
  return (
    <Dropdown
      color={id === selectedId ? 'red' : 'gray'}
      label={<span className="dark:text-white">{name}</span>}
      size="xs"
    >
      <Dropdown.Item onClick={() => setLocation(`/dashboard/${id}`)}>
        Inicio
      </Dropdown.Item>
      {/* <Dropdown.Item onClick={() => setLocation(`/dashboard/${id}/tasks`)}>Tareas</Dropdown.Item> */}
      <Dropdown.Item onClick={() => setLocation(`/dashboard/${id}/news`)}>Noticias</Dropdown.Item>
      {/* <Dropdown.Item onClick={() => setLocation(`/dashboard/${id}/resources`)}>Recursos</Dropdown.Item> */}
      <Dropdown.Item onClick={() => setLocation(`/dashboard/${id}/grades`)}>Notas</Dropdown.Item>
      { user.role === 'manager' && <Dropdown.Item onClick={() => setLocation(`/dashboard/${id}/members`)}>Miembros</Dropdown.Item>}
    </Dropdown>
  )
}
