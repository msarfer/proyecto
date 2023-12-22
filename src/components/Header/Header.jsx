import {
  Button,
  DarkThemeToggle,
  Navbar
} from 'flowbite-react'
import { Link, useLocation } from 'wouter'
import { useStateStore } from '../../store'
import User from './User'

export default function Header () {
  const [location, setLocation] = useLocation()
  const user = useStateStore(state => state.user)
  const setUser = useStateStore(state => state.setUser)

  return (
    <Navbar fluid={true} className="bg-gray-200 dark:bg-[#212528]">
      <Navbar.Brand as={Link} href="/">
        <img
          src="/public/poliformat-logo.png"
          className="h-5 sm:h-8 hover:scale-105 transition"
          alt="Logo poliformat"
        />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse >
        <Navbar.Link>
          <DarkThemeToggle />
        </Navbar.Link>
         <Navbar.Link >
         {user
           ? (
            <User logout={() => setUser(null)} />
             )
           : (
            <Button color="gray" onClick={() => setLocation('login')}>
              Identificarse
            </Button>
             )}
         </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
