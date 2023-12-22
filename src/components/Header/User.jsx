import { Avatar, Dropdown } from 'flowbite-react'
import { Link, useLocation } from 'wouter'
import { useStateStore } from '../../store'

export default function User () {
  const [location, setLocation] = useLocation()

  const user = useStateStore((state) => state.user)
  const setUser = useStateStore((state) => state.setUser)

  const logout = () => {
    // Setear el usuario a null
    setUser(null)

    // Navegar a la raiz
    setLocation('/')
  }
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={
        <>
          <Avatar
            alt="User settings"
            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            rounded
          />
          <span className='ml-2'>{user.name}</span>
        </>
      }
    >
      <Dropdown.Header>
        <span className="block text-sm">{user.name}</span>
        <span className="block truncate text-sm font-medium">
          {user.surname}
        </span>
        <span className="block truncate text-sm font-medium">
          {user.dni}
        </span>
      </Dropdown.Header>
      <Dropdown.Item onClick={() => setLocation('/dashboard')}>Área privada</Dropdown.Item>
      <Dropdown.Item onClick={() => logout()}>Salir</Dropdown.Item>
    </Dropdown>
  )
}
